package io.github.jhipster.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "i_sbn", nullable = false)
    private String iSBN;

    @Column(name = "price")
    private String price;

    @NotNull
    @Column(name = "is_rented", nullable = false)
    private Boolean isRented;

    @Column(name = "rental")
    private String rental;

    @OneToOne(mappedBy = "book")
    @JsonIgnore
    private Author author;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Book title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getiSBN() {
        return iSBN;
    }

    public Book iSBN(String iSBN) {
        this.iSBN = iSBN;
        return this;
    }

    public void setiSBN(String iSBN) {
        this.iSBN = iSBN;
    }

    public String getPrice() {
        return price;
    }

    public Book price(String price) {
        this.price = price;
        return this;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Boolean isIsRented() {
        return isRented;
    }

    public Book isRented(Boolean isRented) {
        this.isRented = isRented;
        return this;
    }

    public void setIsRented(Boolean isRented) {
        this.isRented = isRented;
    }

    public String getRental() {
        return rental;
    }

    public Book rental(String rental) {
        this.rental = rental;
        return this;
    }

    public void setRental(String rental) {
        this.rental = rental;
    }

    public Author getAuthor() {
        return author;
    }

    public Book author(Author author) {
        this.author = author;
        return this;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Book)) {
            return false;
        }
        return id != null && id.equals(((Book) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", iSBN='" + getiSBN() + "'" +
            ", price='" + getPrice() + "'" +
            ", isRented='" + isIsRented() + "'" +
            ", rental='" + getRental() + "'" +
            "}";
    }
}
