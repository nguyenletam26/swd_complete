package ministore.project.fmvstore.Payment;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class PaymentController {
    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);
    PaymentService paymentService;

    @PostMapping("/create")
    public ApiResponse<String> createPayment(@RequestBody PaymentRequest request) {
        String paymentUrl = paymentService.createPayment(request);
        return ApiResponse.<String>builder()
                .result(paymentUrl)
                .build();
    }
    @GetMapping("/verify")
    public ResponseEntity<ApiResponse<String>> verifyPayment(@RequestParam Map<String, String> params) {
        try {

            log.info("Received params: {}", params);
            String txnRef = params.get("vnp_TxnRef");
            String responseCode = params.get("vnp_ResponseCode");

            if (responseCode.equals("00")) {
                boolean verifyResult = paymentService.verifyPayment(params);

                if (verifyResult) {
                    return ResponseEntity.ok(ApiResponse.<String>builder()
                            .result("Payment successful!")
                            .build());
                }
            }

            // Payment failed or verification failed
            return ResponseEntity.ok(ApiResponse.<String>builder()
                    .result("Payment verification failed!")
                    .build());

        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.<String>builder()
                    .result("Error occurred during payment verification!")
                    .build());
        }
    }




    }

