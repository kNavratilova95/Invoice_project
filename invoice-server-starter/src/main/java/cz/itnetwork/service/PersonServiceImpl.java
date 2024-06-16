/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */
package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.entity.repository.PersonRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonServiceImpl implements PersonService {
    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonRepository personRepository;

    /**
     * Adds a new person to the repository.
     *
     * @param personDTO the DTO of the person to be added
     * @return the DTO of the added person
     */
    public PersonDTO addPerson(PersonDTO personDTO) {
        PersonEntity entity = personMapper.toEntity(personDTO);
        entity = personRepository.save(entity);

        return personMapper.toDTO(entity);
    }

    /**
     * Marks a person as hidden (soft delete).
     *
     * @param personId the ID of the person to be removed
     */
    @Override
    public void removePerson(long personId) {
        try {
            PersonEntity person = fetchPersonById(personId);
            person.setHidden(true);
            personRepository.save(person);
        } catch (NotFoundException e) {
            throw new EntityNotFoundException("Osoba s tímto id " + personId + " nebyla nalezena, nemůže být smazána.");
        }
    }

    /**
     * Retrieves all persons who are not marked as hidden.
     *
     * @return a list of DTOs of all visible persons
     */
    @Override
    public List<PersonDTO> getAllPersons() {
        return personRepository.findByHidden(false)
                .stream()
                .map(i -> personMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a person by their ID.
     *
     * @param id the ID of the person to be retrieved
     * @return the DTO of the retrieved person
     */
    @Override
    public PersonDTO getPersonById(long id) {
        PersonEntity person = fetchPersonById(id);
        return personMapper.toDTO(person);
    }

    /**
     * Edits an existing person by marking the old person as hidden and creating a new entry with updated data.
     *
     * @param person the DTO of the updated person data
     * @param id     the ID of the person to be edited
     * @return the DTO of the new person entity
     */
    @Override
    public PersonDTO editPerson(PersonDTO person, Long id) {
        // Mark the old person entity as hidden
        PersonEntity fetchedEntity = fetchPersonById(id);
        fetchedEntity.setHidden(true);
        personRepository.save(fetchedEntity);
        // Create a new person entity with updated data
        PersonEntity newPerson = personMapper.toEntity(person);
        newPerson.setId(0); //we create a new ID of person
        newPerson.setIdentificationNumber(fetchedEntity.getIdentificationNumber()); // Retain the original identification number
        personRepository.save(newPerson);
        return personMapper.toDTO(newPerson);
    }

    /**
     * Retrieves statistics of all persons.
     *
     * @return a list of person statistics DTOs
     */
    @Override
    public List<PersonStatisticsDTO> getPersonsStatistics() {
        return personRepository.getPersonStatistics();
    }


    // region: Private methods

    /**
     * Attempts to fetch a person by their ID.
     * In case a person with the passed ID doesn't exist, a NotFoundException is thrown.
     *
     * @param id the ID of the person to fetch
     * @return the fetched entity
     * @throws NotFoundException in case a person with the passed ID isn't found
     */
    private PersonEntity fetchPersonById(long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Person with id " + id + " wasn't found in the database."));
    }
    // endregion
}
