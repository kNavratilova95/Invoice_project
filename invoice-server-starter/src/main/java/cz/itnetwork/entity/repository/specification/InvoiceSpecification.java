package cz.itnetwork.entity.repository.specification;

import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoiceEntity_;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.PersonEntity_;
import cz.itnetwork.entity.filter.InvoiceFilter;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * Class for specifying properties for filtering invoices.
 */
@RequiredArgsConstructor
public class InvoiceSpecification implements Specification<InvoiceEntity> {

    private final InvoiceFilter filter; //private instance of InvoiceFilter

    @Override
    public Predicate toPredicate(Root<InvoiceEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get(InvoiceEntity_.PRICE), filter.getMaxPrice()));
        }

        if (filter.getMinPrice() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get(InvoiceEntity_.PRICE), filter.getMinPrice()));
        }

        if (filter.getBuyerID() != null) {
            Join<PersonEntity, InvoiceEntity> buyerJoin = root.join(InvoiceEntity_.BUYER);
            predicates.add(criteriaBuilder.equal(buyerJoin.get(PersonEntity_.ID), filter.getBuyerID()));
        }

        if (filter.getSellerID() != null) {
            Join<PersonEntity, InvoiceEntity> sellerJoin = root.join(InvoiceEntity_.SELLER);
            predicates.add(sellerJoin.get(PersonEntity_.ID).in(filter.getSellerID()));
        }

        if (filter.getProduct() != null && !filter.getProduct().isEmpty()) {
            String pattern = "%" + filter.getProduct() + "%"; //filter like LIKE in MySQL for partial search
            predicates.add(criteriaBuilder.like(root.get(InvoiceEntity_.PRODUCT), pattern));
        }
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}