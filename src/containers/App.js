import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

function App() {
  const [robot, setRobot] = useState({
    robots: [],
    searchField: "",
  });

  const onSearchChange = (event) => {
    setRobot({ ...robot, searchField: event.target.value });
  };

  const filteredRobots = robot.robots.filter((rob) => {
    return rob.name.toLowerCase().includes(robot.searchField.toLowerCase());
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        setRobot({ ...robot, robots: users });
      });
  }, []);


  return (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
}

export default App;
