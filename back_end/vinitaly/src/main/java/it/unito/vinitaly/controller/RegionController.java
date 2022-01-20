package it.unito.vinitaly.controller;

import it.unito.vinitaly.model.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


/*
Controller REST per le varie query effettuabili sulle origini di un vino/vitigno
*/


@RestController
@RequestMapping(value = "/regione")
public class RegionController {



    //Funzione che ritorna tutte le regioni italiane presenti nell'ontologia
    @GetMapping("")
    public ResponseEntity<?> getRegioni(){

        String strQuery  =  "select ?uri ?label where { ?uri a :Origine . ?uri rdfs:label ?label. }";

        return new ResponseEntity(Query.executeQueryWithLabel(strQuery), HttpStatus.OK);
    }


}
