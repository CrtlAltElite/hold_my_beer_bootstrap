import React, {useContext} from "react";
import { UserContext } from "../context/UserContext";
import VoteElement  from "../components/VoteElement";
import {Navigate} from 'react-router-dom';

const VotingHistory = () => {
  const {user, setUser, votes} = useContext(UserContext)
  if(!user?.token)return <Navigate to="/login"/>
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8 mx-auto">
          <h2 className="h3 mb-4 page-title">Voting History</h2>
          <div className="my-4">
            <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="/votinghistory"
                  role="tab"
                  aria-controls="home"
                  aria-selected="false"
                >
                  Voting History
                </a>
                {votes?.map((vote)=><VoteElement key={vote.vote_id} vote={vote}/>)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingHistory;
