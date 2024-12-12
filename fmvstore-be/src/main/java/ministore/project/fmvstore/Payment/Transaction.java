package ministore.project.fmvstore.Payment;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Data
@Entity
public class Transaction {
    @Id
    private String id;

    private String username;
    private String details;
    private Date date;
    private Double amount;
}