package it.unito.vinitaly.model;

/*

Classe per rappresentare un oggetto composto da URI e rispettivo Label, che ritorna dall'esecuzione di una query

*/
public class Entity{

    String label;
    String uri;

    public Entity(String label, String uri) {
        this.label = label;
        this.uri = uri;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
}


