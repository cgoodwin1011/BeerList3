# Frontend

4 pages or main-page elements (because with React it can all be on one page):

## Landing

    	Stream of microblog entries and a login facility and generic search box
    	Each micro post shows:
    	  displayName (of user, which can be anonymous), textOfPost, company, location, job, createdAt, updatedAt
        will contain login/register button
        anyone can read, posters must register

## Register/profile

    	a form where a user can register themselves or edit their registration information

## Post

    	a form where users can enter new post

## Search/search-results page

    	Has a search form to support field searching (i.e., for a particular company, location, job, or poster)
    	Displays search results.

# Backend

On the backend, we're going to have 4 MySQL tables: **posts**, **users**, **companyLoc**, **jobs**

  **required fields marked with asterisks**
  meaning of fields **should** be self-evident.  
  hashValue is a check sum (or something like that) to detect tamper in tables

## users table

  userID*
  FirstName*
  LastName*
  displayName -- name to display with user post
  email0*
  showEmails  -- boolean
  email1
  telno
  showTelno   -- boolean
  address1
  address2
  showStreet  -- boolean
  city
  showCity    -- boolean
  state
  showState   -- boolean
  zip
  showZip     -- boolean
  password    -- encrypted through passportjs
  myPosts     -- link to array of posts (however we handle this)
  preferredLocs -- array, up to five
  preferredCo   -- array, up to five
  prejerredJob  -- array, up to five
  createdAt
  updatedAt
  hashValue

## Jobs table

  [job]ID*
  jobTitle*
  jobDescription
  createdAt
  updatedAt
  hashValue

## companyLoc table

  [company]ID*
  companyName*
  location*
  address1
  address2
  city
  state
  zipcode
  createdAt
  updatedAt
  hashValue

## post table

  [post]ID*
  userID*
  companyLocID*
  jobID*
  keepAnonymous* -- boolean
  textOfPost*
  createdAt
  updatedAt
  hashValue

## routes

  ### index.html

    will receive back an array of json objects as follows for each post:

    {
      postID:         number,
      displayName:    string,
      annoymousPost:  boolean,
      posterID:       number,        // unless poster is anonymous
      textOfPost:     text,
      company:        string,
      location        string,
      job:            string,
      createdAt:      yyyymmddhhss,
      updatedAt:      yyyymmddhhss
    }

      what posts are returned int the array depends on a state variable "currentHomeView":

        generalPublic  (rev chrono flow of posts in nearby areas)
        generalUser    (rev chrono flow based on user preferences)
        searchLocation (rev chrono, will maintain or discard )
        searchCompany  
        searchJob      

    if a user is logged in, should also receive this information:

    {
      userID:       integer,
      FirstName:    string,
      LastName:     string,
      displayName:  string
    }

    if user is logged out, should send this information:
    {
      userEmail:    string,
      userPassword: string
    }

  ### post

    sends:

    {
      postID:      number,
      userID:      number,
      textOfPost:  text,
      company:     string,
      location     string,
      job:         string
    }

  ### register/profile

    recieves and sends:

    {
      userID:      string
      FirstName:   string
      LastName:    string
      displayName: string -- name to display with user post
      email0:      string*
      showEmails:  boolean
      email1:      string
      telno:       string
      showTelno:   boolean
      address1:    string
      address2:    string
      showStreet:  boolean
      city:        string
      showCity:    boolean
      state:       string
      showState:   boolean
      zip:         string
      showZip:     boolean
      password:    string -- encrypted through passportjs,
      myPosts:     array link to array of posts (however we handle this),
      createdAt:   yyyymmddhhss,
      updatedAt:   yyyymmddhhss
    }

