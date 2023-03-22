
import { useState } from "react";

import { TimelineBody, HeaderContainer, Body } from "./styles";

// import { useNavigate } from "react-router-dom";

const Timelines = () => {
 
    return (
<TimelineBody>
<section>
  <div class="container py-5 ">
    <div class="main-timeline-2 ">
      <div class="timeline-2 left-2 ">
        <div class="card bg-info">
          


          <div class="card-body p-4">
            <h4 class="fw-bold mb-4">DBMS
            {/* <li class="event" data-date="22 OCT 2022 - 22 OCT 202">
                                <h4 class="mb-3 pt-3">DBMS</h4> */}
            </h4>
            <p class="text-muted mb-4"><i class="far fa-clock" aria-hidden="true"></i> 22 OCT 2022 - 22 OCT 2023</p>
           
          </div>
        </div>
      </div>
      <div class="timeline-2 right-2">
        <div class="card bg-info">
          
          <div class="card-body p-4">
            <h4 class="fw-bold mb-4">DBMS</h4>
            <p class="text-muted mb-4"><i class="far fa-clock" aria-hidden="true"></i>22 OCT 2021 - 22 OCT 2022</p>
           
          </div>
        </div>
      </div>
      <div class="timeline-2 left-2">
        <div class="card bg-info">
         
          <div class="card-body p-4">
            <h4 class="fw-bold mb-4">DBMS</h4>
            <p class="text-muted mb-4"><i class="far fa-clock" aria-hidden="true"></i> 22 OCT 2020 - 22 OCT 2021</p>
           
          </div>
        </div>
      </div>
      <div class="timeline-2 right-2">
        <div class="card bg-info">
         
          <div class="card-body p-4">
            <h4 class="fw-bold mb-4">DBMS</h4>
            <p class="text-muted mb-4"><i class="far fa-clock" aria-hidden="true"></i> 22 OCT 2019 - 22 OCT 2020</p>
           
          </div>
        </div>
      </div>
      <div class="timeline-2 left-2">
        <div class="card bg-info">
         
          <div class="card-body p-4">
            <h4 class="fw-bold mb-4">DBMS</h4>
            <p class="text-muted mb-4"><i class="far fa-clock" aria-hidden="true"></i> 2019</p>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </TimelineBody>
    );
}





  
  export default Timelines;


