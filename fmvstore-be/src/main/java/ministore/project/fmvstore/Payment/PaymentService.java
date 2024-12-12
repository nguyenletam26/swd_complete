package ministore.project.fmvstore.Payment;


import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.User.UserEntity;
import ministore.project.fmvstore.User.UserRepository;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import static lombok.AccessLevel.PRIVATE;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class PaymentService {
    UserRepository userRepository;
    TransactionRepository transactionRepository;
    Logger log = LoggerFactory.getLogger(PaymentService.class);

    // VNPay configuration
    String vnp_TmnCode = "ZYT12LWX";
    String vnp_HashSecret = "GGT0D1DN6EJG6AULCCG59USTDZVY2SX7";
    String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    String vnp_ReturnUrl = "http://localhost:5173/payment/verify";
    Map<String, String> paymentTokens = new HashMap<>();

    public String createPayment(PaymentRequest request) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();

            // Create VNPay payment parameters
            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", "2.1.0");
            vnp_Params.put("vnp_Command", "pay");
            vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
            vnp_Params.put("vnp_Amount", String.valueOf(request.getAmount() * 100));
            vnp_Params.put("vnp_CurrCode", "VND");

            // Generate transaction reference
            String txnRef = String.valueOf(System.currentTimeMillis());
            vnp_Params.put("vnp_TxnRef", txnRef);
            vnp_Params.put("vnp_OrderInfo", "Nap tien vao tai khoan");
            vnp_Params.put("vnp_OrderType", "other");
            vnp_Params.put("vnp_Locale", "vn");
            vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
            vnp_Params.put("vnp_IpAddr", request.getIpAddr());

            // Add create date
            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnp_CreateDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

            // Add expire date
            cld.add(Calendar.MINUTE, 15);
            String vnp_ExpireDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

            // Build hash data and query
            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            Iterator<String> itr = fieldNames.iterator();

            while (itr.hasNext()) {
                String fieldName = itr.next();
                String fieldValue = vnp_Params.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    // Build hash data
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                    // Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                    if (itr.hasNext()) {
                        query.append('&');
                        hashData.append('&');
                    }
                }
            }

            String queryUrl = query.toString();
            String vnp_SecureHash = hmacSHA512(vnp_HashSecret, hashData.toString());
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;

            // Store payment token
            paymentTokens.put(txnRef, username);

            return vnp_PayUrl + "?" + queryUrl;

        } catch (Exception ex) {
            log.error("Error creating payment: ", ex);
            throw new AppException(ErrorCode.PAYMENT_ERROR);
        }
    }
    // PaymentService.java
    public boolean verifyPayment(Map<String, String> params) {
        try {
            // Get transaction reference
            String txnRef = params.get("vnp_TxnRef");

            // Check if transaction already exists
            if (transactionRepository.existsById(txnRef)) {
                log.info("Transaction already processed for txnRef: {}", txnRef);
                return false;
            }

            // Continue with verification logic
            String vnp_SecureHash = params.get("vnp_SecureHash");
            String username = SecurityContextHolder.getContext().getAuthentication().getName();

            // Remove hash from params for verification
            Map<String, String> vnp_Params = new HashMap<>(params);
            vnp_Params.remove("vnp_SecureHash");
            vnp_Params.remove("vnp_SecureHashType");

            // Sort and hash params
            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            for (String field : fieldNames) {
                String fieldValue = vnp_Params.get(field);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    hashData.append(field).append("=").append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    if (fieldNames.indexOf(field) < fieldNames.size() - 1) {
                        hashData.append("&");
                    }
                }
            }

            String calculatedHash = hmacSHA512(vnp_HashSecret, hashData.toString());
            if (!calculatedHash.equals(vnp_SecureHash)) {
                return false;
            }

            if ("00".equals(params.get("vnp_ResponseCode"))) {
                UserEntity user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
                long amount = Long.parseLong(params.get("vnp_Amount")) / 100;

                // Update balance and save transaction only if not already processed
                user.setBalance(user.getBalance() + amount);
                userRepository.save(user);

                // Save the transaction to prevent duplicate processing
                Transaction transaction = new Transaction();
                transaction.setId(txnRef); // Set the id with vnp_TxnRef
                transaction.setUsername(username);
                transaction.setDetails("Nạp tiền vào tài khoản");
                transaction.setDate(new Date());
                transaction.setAmount((double) amount);
                transactionRepository.save(transaction);

                return true;
            }
            return false;
        } catch (Exception ex) {
            log.error("Error verifying payment: ", ex);
            return false;
        }
    }



    private String hmacSHA512(String key, String data) throws Exception {
        Mac sha512Hmac = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA512");
        sha512Hmac.init(secretKey);
        byte[] hmacData = sha512Hmac.doFinal(data.getBytes());
        return bytesToHex(hmacData);
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}