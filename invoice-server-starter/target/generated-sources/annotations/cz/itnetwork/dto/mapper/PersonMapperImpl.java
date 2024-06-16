package cz.itnetwork.dto.mapper;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.entity.PersonEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 21.0.1 (Eclipse Adoptium)"
)
@Component
public class PersonMapperImpl implements PersonMapper {

    @Override
    public PersonEntity toEntity(PersonDTO source) {
        if ( source == null ) {
            return null;
        }

        PersonEntity personEntity = new PersonEntity();

        if ( source.getId() != null ) {
            personEntity.setId( source.getId() );
        }
        personEntity.setName( source.getName() );
        personEntity.setIdentificationNumber( source.getIdentificationNumber() );
        personEntity.setTaxNumber( source.getTaxNumber() );
        personEntity.setAccountNumber( source.getAccountNumber() );
        personEntity.setBankCode( source.getBankCode() );
        personEntity.setIban( source.getIban() );
        personEntity.setTelephone( source.getTelephone() );
        personEntity.setMail( source.getMail() );
        personEntity.setStreet( source.getStreet() );
        personEntity.setZip( source.getZip() );
        personEntity.setCity( source.getCity() );
        personEntity.setCountry( source.getCountry() );
        personEntity.setNote( source.getNote() );

        return personEntity;
    }

    @Override
    public PersonDTO toDTO(PersonEntity source) {
        if ( source == null ) {
            return null;
        }

        PersonDTO personDTO = new PersonDTO();

        personDTO.setId( source.getId() );
        personDTO.setName( source.getName() );
        personDTO.setIdentificationNumber( source.getIdentificationNumber() );
        personDTO.setTaxNumber( source.getTaxNumber() );
        personDTO.setAccountNumber( source.getAccountNumber() );
        personDTO.setBankCode( source.getBankCode() );
        personDTO.setIban( source.getIban() );
        personDTO.setTelephone( source.getTelephone() );
        personDTO.setMail( source.getMail() );
        personDTO.setStreet( source.getStreet() );
        personDTO.setZip( source.getZip() );
        personDTO.setCity( source.getCity() );
        personDTO.setCountry( source.getCountry() );
        personDTO.setNote( source.getNote() );

        return personDTO;
    }

    @Override
    public void updatePersonDTO(PersonDTO source, PersonDTO target) {
        if ( source == null ) {
            return;
        }

        target.setId( source.getId() );
        target.setName( source.getName() );
        target.setIdentificationNumber( source.getIdentificationNumber() );
        target.setTaxNumber( source.getTaxNumber() );
        target.setAccountNumber( source.getAccountNumber() );
        target.setBankCode( source.getBankCode() );
        target.setIban( source.getIban() );
        target.setTelephone( source.getTelephone() );
        target.setMail( source.getMail() );
        target.setStreet( source.getStreet() );
        target.setZip( source.getZip() );
        target.setCity( source.getCity() );
        target.setCountry( source.getCountry() );
        target.setNote( source.getNote() );
    }

    @Override
    public void updatePersonEntity(PersonDTO source, PersonEntity target) {
        if ( source == null ) {
            return;
        }

        if ( source.getId() != null ) {
            target.setId( source.getId() );
        }
        target.setName( source.getName() );
        target.setIdentificationNumber( source.getIdentificationNumber() );
        target.setTaxNumber( source.getTaxNumber() );
        target.setAccountNumber( source.getAccountNumber() );
        target.setBankCode( source.getBankCode() );
        target.setIban( source.getIban() );
        target.setTelephone( source.getTelephone() );
        target.setMail( source.getMail() );
        target.setStreet( source.getStreet() );
        target.setZip( source.getZip() );
        target.setCity( source.getCity() );
        target.setCountry( source.getCountry() );
        target.setNote( source.getNote() );
    }
}
