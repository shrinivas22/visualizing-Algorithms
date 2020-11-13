import React from "react";
import styled from "styled-components";
import Sorting from "../Algorithms/Sortings/sorting";
//import Searching from "../../Algorithms/Searching/searching";

const SortingV = styled.div`
  display:flex
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
const SortVisualize = (props) => (
  <SortingV>
    <h1>SORTINg..</h1>
  </SortingV>
);

export default SortVisualize;
