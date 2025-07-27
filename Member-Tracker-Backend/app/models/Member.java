package models;

import javax.persistence.*;

import java.util.*;
import javax.persistence.*;

import io.ebean.*;
import org.hibernate.validator.constraints.Length;
import play.data.format.*;
import play.data.validation.*;

@Entity
public class Member extends Model {

    @Id
    private Long member_id;

    @Constraints.Required
    @Length(max = 40)
    private String name;

    @Constraints.Email
    @Length(max = 40)
    private String email;

    @Length(min = 8, max = 15)
    private String phone;

    @Length(max = 40)
    private String sex;

    @JoinTable(name = "Memberships",
            joinColumns = {
                    @JoinColumn(name = "member_member_id", referencedColumnName = "member_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "club_club_id", referencedColumnName = "club_id")
            }

    )
    @ManyToMany
    private List<Club> clubs;

    @JoinTable(name="Member_Rank")
    @ManyToMany
    private List<Rank> ranks;

    public Member(Long member_id, @Constraints.Required String name, @Constraints.Email String email, String phone, String sex) {
        this.member_id = member_id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.sex = sex;
    }

    public void setRank(Rank rank) {
        this.ranks.add(rank);
    }

    public Long getMember_id() {
        return member_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public List<Club> getClubs() {
        return clubs;
    }

    public void setClub(Club club) {
        this.clubs.add(club);
    }

    public List<Rank> getRanks() {
        return ranks;
    }

    public static Finder<Long, Member> find = new Finder<Long, Member>(Member.class);

}