import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../card/TaskCard';
import './Dashboard.css';

function Dashboard() {
  const GROUP_BY_STATUS = 'status';
  const GROUP_BY_USER = 'user';
  const GROUP_BY_PRIORITY = 'priority';
  const SORT_BY_PRIORITY = 'priority';
  const SORT_BY_TITLE = 'title';

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(GROUP_BY_STATUS); // Default to group by status
  const [sortBy, setSortBy] = useState(SORT_BY_PRIORITY); // Default to sort by priority
  const [selectedOption, setSelectedOption] = useState('display');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.quicksell.co/v1/internal/frontend-assignment'
        );
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchData();
  }, []);

  const groupedTickets = tickets.reduce((groups, ticket) => {
    const key = groupBy === GROUP_BY_USER ? ticket.userId : ticket[groupBy];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ticket);
    return groups;
  }, {});

  Object.keys(groupedTickets).forEach(key => {
    groupedTickets[key].sort((a, b) => {
      if (sortBy === SORT_BY_PRIORITY) {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  });

  const handleGroupByChange = event => {
    setGroupBy(event.target.value);
  };

  const handleSortByChange = event => {
    setSortBy(event.target.value);
  };
  const handleSelectedOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="app">
       <div className="navbar">
        <select
          id="selectedOption"
          name="selectedOption"
          value={selectedOption}
          onChange={handleSelectedOptionChange}
        >
          <option value="grouping">Grouping</option>
          <option value="ordering">Ordering</option>
        </select>
        {selectedOption === 'grouping' && (
          <select
            id="groupBy"
            name="groupBy"
            value={groupBy}
            onChange={handleGroupByChange}
          >
            <option value={GROUP_BY_STATUS}>Group by Status</option>
            <option value={GROUP_BY_USER}>Group by User</option>
            <option value={GROUP_BY_PRIORITY}>Group by Priority</option>
          </select>
        )}
        {selectedOption === 'ordering' && (
          <select
            id="sortBy"
            name="sortBy"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value={SORT_BY_PRIORITY}>Sort by Priority</option>
            <option value={SORT_BY_TITLE}>Sort by Title</option>
          </select>
        )}
      </div>

      <div className="dashboard">
        {Object.keys(groupedTickets).map(key => (
          <div key={key}>
            {groupBy === GROUP_BY_STATUS && <h3> {key}</h3>}
            {groupBy === GROUP_BY_USER && (
              <h3>
                 {users.find(user => user.id === key)?.name || 'Unknown User'}
              </h3>
            )}
            {groupBy === GROUP_BY_PRIORITY && <h3> {key}</h3>}
            {groupedTickets[key].map(ticket => {
              const user = users.find(user => user.id === ticket.userId);
              return (
                <TaskCard
                  key={ticket.id}
                  preHeading={ticket.id}
                  title={ticket.title}
                  label={ticket.tag[0]}
                  imageUrl={user ? user.avatar : ''}
                  isActive={user ? user.available : false}
                  userid={user ? user.id : ''}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}


export default Dashboard;
