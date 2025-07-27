package models;

import io.ebean.Finder;
import io.ebean.Model;
import org.hibernate.validator.constraints.Length;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Rank extends Model {

    @Id
    private Long rank_id;

    @Constraints.Required
    @Length(max = 40)
    private String name;

    @ManyToOne
    private Club club;

    @JoinTable(name = "Member_Rank",
            joinColumns = {
                    @JoinColumn(name = "rank_rank_id", referencedColumnName = "rank_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "member_member_id", referencedColumnName = "member_id")
            }
    )
    @ManyToMany(mappedBy = "ranks", cascade = CascadeType.ALL)
    private List<Member> members;


    public Rank(@Length(max = 40) @Constraints.Required String name) {
        this.name = name;
    }

    public Rank() {

    }

    public void setMembers(Member member) {
        members.add(member);
        member.setRank(this);
    }

    public void setClub(Club club)
    {
        this.club = club;
    }

    public Long getRank_id() {
        return rank_id;
    }

    public String getName() {
        return name;
    }


    public String getClubName(){
        if (club == null)
            return "null";
        else
            return club.getName();
    }

    public static Finder<Long, Rank> find = new Finder<Long, Rank>(Rank.class);

}
