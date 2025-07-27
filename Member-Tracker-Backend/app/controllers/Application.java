package controllers;

import javax.inject.Inject;

import models.Club;
import models.Event;
import models.Member;
import models.Rank;
import play.data.Form;
import play.data.FormFactory;
import play.data.DynamicForm;
import play.mvc.*;

import java.util.List;

import static play.libs.Json.toJson;

public class Application extends Controller {

    @Inject
    FormFactory formFactory;


    /* Just to test that restful api is
       working, currently not used */
    public Result start() {
        return ok();
    }

    // Show club data as restful API
    public Result getClubs() {
        List<Club> clubs = Club.find.all();
        return ok(toJson(clubs));
    }

    // Show member data as restful API
    public Result getMembers() {
        List<Member> members = Member.find.all();
        return ok(toJson(members));
    }

    // Add club data received from POST request
    public Result addClub() {
        Form<Club> clubForm = formFactory.form(Club.class);
        // Club object
        Club club;

        // Any issues with data?
        if (clubForm.hasErrors())
            return badRequest();
        else {
            // Bind the data to the object
            club = clubForm.bindFromRequest().get();
            // Perform save which will save to database
            club.save();
        }

        // Send back an ok
        return ok();
    }

    /* Add member data received from POST request
       Belongs to Club */
    public Result addMember() {
        DynamicForm requestData = formFactory.form().bindFromRequest();

        // Locate the club to add the member to
        Club club = Club.find.byId(Long.parseLong(requestData.get("club_id")));

        Member existingMember = Member.find.byId(Long.parseLong(requestData.get("member_id")));


        // Any issues with finding the club?
        if(club == null)
            return notFound();
        else {

            if (existingMember != null)
            {
                // Add this new member to the club found
                club.setMember(existingMember);

                // Update this club in database
                club.update();
            } else
            {
                // Create new member object from the data via constructor
                Member member = new Member(Long.parseLong(requestData.get("member_id")),requestData.get("name"), requestData.get("email"), requestData.get("phone"), requestData.get("sex"));

                // Perform save which will save to database
                member.save();

                // Add this new member to the club found
                club.setMember(member);

                // Update this club in database
                club.update();
            }

            // Send back an ok
            return ok();
        }
    }

    /* Add member data received from POST request
       Belongs to Club */
    public Result addEvent() {
        DynamicForm requestData = formFactory.form().bindFromRequest();

        // Locate the club to add the event to
        Club club = Club.find.byId(Long.parseLong(requestData.get("club_id")));

        // Any issues with finding the club?
        if(club == null)
            return notFound();
        else {
            // Create new event object from the data via constructor
            Event event = new Event(requestData.get("name"), requestData.get("location"), requestData.get("description"), requestData.get("date"), requestData.get("time"));

            // Perform save which will save to database
            event.save();

            // Add this new event to the club found
            club.setEvents(event);

            // Update this club in database
            club.update();

            // Send back an ok
            return ok();
        }
    }

    // Adds a club's rank to a member
    public Result addRankToMember() {
        DynamicForm requestData = formFactory.form().bindFromRequest();

        // Locate the Member to add the Rank to
        Member member = Member.find.byId(Long.parseLong(requestData.get("member_id")));

        // Locate the club to get the Ranks from
        Club club = Club.find.byId(Long.parseLong(requestData.get("club_id")));

        // Any issues?
        if(club == null || member == null)
            return notFound();
        else {
            // Get all Stored Ranks
            List<Rank> ranks = club.getRanks();

            // For each rank in ranks
            for(Rank rank : ranks){
                // If the name exist
                if(rank.getName().equals(requestData.get("name")))
                {
                    // set rank to the found rank
                    member.setRank(rank);

                    // Update the member
                    member.update();

                    // Send back an ok
                    return ok();
                }
            }

            // Send back an error
            return notFound();
        }
    }

    // Add a rank to a club object
    public Result addRank() {
        DynamicForm requestData = formFactory.form().bindFromRequest();

        // Locate the club to add the Ranks to
        Club club = Club.find.byId(Long.parseLong(requestData.get("club_id")));

        // Does it exist?
        if(club == null)
            return notFound();
        else {
            // Generate a new rank object to be added to club
            Rank rank = new Rank(requestData.get("name"));

            // Add the rank to the club
            club.setRank(rank);

            // Update the club
            club.update();

            // Send back and ok
            return ok();
        }
    }

    // Deletes a club
    public Result deleteClub() {
        DynamicForm requestData = formFactory.form().bindFromRequest();

        // Locate the club with the id specified
        Club club = Club.find.ref(Long.parseLong(requestData.get("club_id")));

        /* Get a list of all Members to remove
           members belonging to 0 clubs */
        List<Member> members = Member.find.all();


        if(club == null)
            return notFound();
        else {
            // Delete the found club
            club.delete();

            // General cleaning of members that don't belong to any club
            if (members != null)
            {
                for(Member member : members){
                    if(member.getClubs().size() == 0)
                        member.delete();
                }
            }
            // Send back and ok
            return ok();
        }
    }

    // Deletes a Member from a club
    public Result deleteMember() {
        DynamicForm requestData = formFactory.form().bindFromRequest();

        // Locate the club with the id specified
        Club club = Club.find.ref(Long.parseLong(requestData.get("club_id")));

        // Locate the Member to add the Rank to
        Member member = Member.find.byId(Long.parseLong(requestData.get("member_id")));

        // Any issues?
        if(club == null || member == null)
            return notFound();
        else {
            club.deleteMember(member);
            club.update();
            return ok();
        }
    }

    // Deletes an event
    public Result deleteEvent() {
        DynamicForm requestData = formFactory.form().bindFromRequest();

        // Locate the event with the id specified
        Event event = Event.find.ref(Long.parseLong(requestData.get("event_id")));

        if(event == null)
            return notFound();
        else {
            // Delete the found event
            event.delete();

            // Send back and ok
            return ok();
        }
    }

    // Deletes an event
    public Result deleteRank() {
        DynamicForm requestData = formFactory.form().bindFromRequest();

        // Locate the Rank with the id specified
        Rank rank = Rank.find.ref(Long.parseLong(requestData.get("rank_id")));

        if(rank == null)
            return notFound();
        else {
            // Delete the found rank
            rank.delete();

            // Send back and ok
            return ok();
        }
    }
}
