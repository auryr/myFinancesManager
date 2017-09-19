# 'Finances manager' App

<img src="images/dashboard" width="800px">

<img src="images/transaction.png" width="800px">



Slovolingo is an app inspired by Duolingo which allows users to learn Slovene, the language of Slovenia.

To begin, a new user can register with a username, email address, and password. After, the user can login to enter the main page. 

On the main page, the user sees three sections. The left side of the page contains a box with several buttons linking to quizzes on Slovene topics (to be, greetings, days of the week, and numbers). Clicking a link takes the user to the quiz. The upper right corner of the main page contains a box welcoming the user and displaying the user's points. The points system is based on self-evaluation - if the user feels an additional point has been earned by a successful visit, the user can click the '+1' button to add another point, which is recorded in the database. Finally, the lower right side of the main page contains a box with a random slovene word to learn. This word updates every time the user returns to the main page.

On each quiz page, the user sees the topic at the top of the page. Under the topic, there is a box containing a question, such as "What does 'jaz sem' mean?"  Under the question are 3 boxes with posisble answers. The order of these possible answers is determined randomly so it changes each time the quiz is taken. If the user clicks a wrong answer, a knocking sound is played so the user knows it was a wrong answer. If the user clicks the right answer, a ringing sound plays and the quiz moves on to the next question. For each question, an audio clip of the pronunciation is played. Each clip is a recording of my pronouncing the word.

After a quiz is done, the user can navigate back to the main page by clicking 'slovolingo' in the upper left corner of the screen. From there, the user can logout by clicking the button in the upper right corner of the main page.

Slovolingo is deployed at: https://slovolingo.herokuapp.com/

## Technology

Slovolingo is an app constructed using React and Express.js. The app uses PostgreSQL for the database. 

### Sample Code

Here is the code from client/app.js to route through the app:

      render() {
        return (
          <Router>
            <div className="App">
              <Route exact path="/" render={() => <Welcome />} />
              <Route exact path="/register" render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit} />} />
              <Route exact path="/login" render={() => <Login handleLoginSubmit={this.handleLoginSubmit} />} />
              <Route exact path="/main" render={() => <Main plusOne={this.plusOne} handleRedirect={this.handleRedirect} username={this.state.username} id={this.state.id} level={this.state.level} />} />
              <Route exact path="/quizone" render={() => <QuizOne handleRedirect={this.handleRedirect} username={this.state.username} />} />
              <Route exact path="/quiztwo" render={() => <QuizTwo handleRedirect={this.handleRedirect} username={this.state.username} />} />
              <Route exact path="/quizthree" render={() => <QuizThree handleRedirect={this.handleRedirect} username={this.state.username} />} />
              <Route exact path="/quizfour" render={() => <QuizFour handleRedirect={this.handleRedirect} username={this.state.username} />} />
              {this.redirectTo()}
            </div>
          </Router>
        );
      }


Here is the code from the QuizOne.jsx component to render the first quiz:


        render(){
            return (
              <div className="quiz-one">
                <div className="quiz-one-header">
                  <h1 className="quiz-one-message"><Link to="/main">slovolingo</Link></h1>
                  <h3>{this.props.username}</h3>
                </div>

                <div className="quiz-one-main">
                  <h2>Quiz One: Biti ('to be')</h2>
                  <div className="quiz-one-question">
                    <h2>{this.state.number} of 10</h2>
                    <h3>{this.state.question}</h3>
                  </div>

                  <div className="quiz-one-choices">
                    <button onClick={this.clickLeft} className="quiz-answer"><h4>{this.state.left}</h4></button>
                    <button onClick={this.clickCenter} className="quiz-answer"><h4>{this.state.center}</h4></button>
                    <button onClick={this.clickRight} className="quiz-answer"><h4>{this.state.right}</h4></button>
                  </div>
                </div>

                <div className="footer">
                  <a href="https://github.com/danielwbeebe" target="_blank" rel="noopener noreferrer"><h2>Created By Dan Beebe</h2></a>
                </div>
              </div>
            )
          }

Here is the code from the db/migrations/migration_09_11_2017.sql file to create the users table:

        DROP TABLE IF EXISTS users;

        CREATE TABLE users(
            id BIGSERIAL PRIMARY KEY,
            username VARCHAR UNIQUE NOT NULL,
            email VARCHAR UNIQUE NOT NULL,
            password_digest TEXT NOT NULL,
            level INT
        );

## Opportunities for Future Growth

In terms of future edits, I would like to add more quizzes and to create a more objective system of increasing the user's points by, for example, increasing the user's points each time a quiz is completed.




