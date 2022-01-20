package it.unito.vinitaly.model;

import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;

import java.util.ArrayList;
import java.util.List;

public class Query {


    public static final String REPO_QUERY = "http://localhost:7200/repositories/Vinitaly"; //costante contenente l'URL per accedere al repository su GraphDB per effettuare query sparql di SELECT
    private static final String REPO_INSERT = "http://localhost:7200/repositories/Vinitaly/statements"; //costante contenente l'URL per accedere al repository su GraphDB per effettuare query sparql di INSERT



    //Costante contenente i prefissi anteposti alle query SPARQL
    public static final String PREFIX =
            "PREFIX : <http://www.semanticweb.org/pisca/vinitaly#> " +
                    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
                    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                    "PREFIX sesame: <http://www.openrdf.org/schema/sesame#> " +
                    "PREFIX m: <http://www.ontologydesignpatterns.org/cp/owl/collectionentity.owl#> ";

    //Funzione che data una query in input, ritorna la lista dei risultati prodotti
    public static List<String> executeQuery(String query){

        List<String> list=new ArrayList<String>();

        QueryExecution queryExecution = QueryExecutionFactory.sparqlService(REPO_QUERY, PREFIX + query);

        System.out.println(PREFIX + query);

        for (ResultSet results = queryExecution.execSelect(); results.hasNext();) {
            QuerySolution qs = results.next();
            String label = formatString(qs.get("?n").toString());
            list.add(label);
        }

        queryExecution.close();
        return list;
    }

    //Funzione che data una query in input (con ritorno di uri e label), ritorna la lista dei risultati prodotti
    public static List<Entity> executeQueryWithLabel(String query) {

        List<Entity> list = new ArrayList<Entity>();

        QueryExecution queryExecution = QueryExecutionFactory.sparqlService(REPO_QUERY, PREFIX + query);

        System.out.println(PREFIX + query);

        for (ResultSet results = queryExecution.execSelect(); results.hasNext(); ) {
            QuerySolution qs = results.next();

            String label = formatString(qs.get("?label").toString());
            String uri = qs.get("?uri").toString();

            Entity result = new Entity(label,uri);
            list.add(result);
        }

        queryExecution.close();
        return list;
    }


    //Funzione che data una string la formatta, rimuovendo i simboli speciali come @
    public static String formatString(String s){
        String r = s;

        if(s.contains("@")) r = s.split("@")[0];

        if(s.contains("^"))  r = s.split("\\^")[0];

        if(s.contains("-")) r = s.replace("-","\n");

        return r;

    }
}
