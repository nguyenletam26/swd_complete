package ministore.project.fmvstore.Configuration;

import com.nimbusds.jose.JOSEException;
import ministore.project.fmvstore.Authentication.AuthenticationService;
import ministore.project.fmvstore.Introspect.IntrospectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Objects;

@Component
public class CustomJwtDecoder implements JwtDecoder {
    @Value("${jwt.signerKey}")
    private String signerKey;

    private final AuthenticationService authenticationService;

    public CustomJwtDecoder(@Lazy AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    private NimbusJwtDecoder nimbusJwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            var response = authenticationService.introspect(IntrospectRequest.builder()
                    .token(token)
                    .build());

            if (!response.isValid())
                throw new JwtException("Token invalid");
        } catch (ParseException | JOSEException e) {
            throw new JwtException(e.getMessage());
        }

        if (Objects.isNull(nimbusJwtDecoder)) {
            SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
            nimbusJwtDecoder = NimbusJwtDecoder
                    .withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }

        return nimbusJwtDecoder.decode(token);
    }
}