package models;

import io.ebean.Finder;
import io.ebean.Model;
import org.hibernate.validator.constraints.Length;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Club extends Model {

    @Id
    private Long club_id;

    @Constraints.Required
    @Length(max = 40)
    private String name;

    @Constraints.Required
    @Length(max = 40)
    private String category;

    private String description;

    @Length(max = 40)
    private String location;

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    private List<Invoice> invoices = new ArrayList<>();

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    private List<Event> events = new ArrayList<>();

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    private List<Rank> ranks = new ArrayList<>();

    @JoinTable(name="Memberships")
    @ManyToMany(mappedBy = "clubs", cascade = CascadeType.ALL)
    private List<Member> members;


    public Long getClub_id() {
        return club_id;
    }

    public String getName() {
        return name;
    }

    public void setEvents(Event event) {
        events.add(event);
        event.setClub(this);
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }

    public List<Event> getEvents() {
        return events;
    }

    public List<Rank> getRanks() {
        return ranks;
    }

    public void setRank(Rank rank) {
        this.ranks.add(rank);
        rank.setClub(this);
    }

    public List<String> getMembersInfo() {
        List<String> memberInfo = new ArrayList<>();

        for(Member member : members) {
            memberInfo.add("Member Number: " + member.getMember_id() + " - " + member.getName());
        }

        return memberInfo;
    }

    public void setMember(Member member) {
        this.members.add(member);
        member.setClub(this);
    }

    public void deleteMember(Member member) {
        this.members.remove(member);
        member.setClub(null);
    }

    public static Finder<Long, Club> find = new Finder<Long,Club>(Club.class);

}

