package com.oumayma.ems_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor //génère un constructeur vide (par defaut) (utile pour JPA)// Génère Employee()
@AllArgsConstructor //génère un constructeur avec tous les champs en paramètres// Génère Employee(id, firstName, lastName, email)

//Déclarations JPA
@Entity //indique que cette classe représente une table dans la base de données
@Table(name="employees") //Si tu ne mets rien, Hibernate utilisera le nom de la classe (ici c employee)
public class Employee {

    @Id //ce champ est la clé primaire de la table
    @GeneratedValue(strategy = GenerationType.IDENTITY) //cad c autoincrement
    private Long id;

    @Column(name="first_name")
    private String firstname;
    @Column(name="last_name")
    private String lastName;
    @Column(name="email_id",nullable = false,unique = true)
    private String email;

    public Employee(String firstName, String lastName, String email) {
        this.firstname = firstName;
        this.lastName = lastName;
        this.email = email;
    }

}
