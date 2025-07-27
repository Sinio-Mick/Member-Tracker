package models;

import io.ebean.Finder;
import io.ebean.Model;
import org.springframework.format.annotation.DateTimeFormat;
import play.data.validation.Constraints;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class Event extends Model {

    @Id
    private Long event_id;

    @Constraints.Required
    @Constraints.Max(40)
    private String name;

    @Constraints.Required
    @Constraints.Max(40)
    private String location;

    @Constraints.Required
    private String description;

    // Timestamps can be used later on for improvements
    @Constraints.Required
    private String date;

    @Constraints.Required
    private String time;

    @ManyToOne
    private Club club;


    public Event(@Constraints.Max(40) @Constraints.Required String name, @Constraints.Max(40) @Constraints.Required String location, @Constraints.Required String description, @Constraints.Required String date, @Constraints.Required String time) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.date = date;
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public Long getEvent_id() {
        return event_id;
    }

    public static Finder<Long, Event> find = new Finder<Long, Event>(Event.class);

}
