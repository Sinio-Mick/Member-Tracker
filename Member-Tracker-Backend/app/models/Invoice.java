package models;

import io.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


// Nice to have but not currently needed to be implemented.
@Entity
public class Invoice extends Model {

    @Id
    private Long invoice_id;

    @ManyToOne
    private Club club;
}
