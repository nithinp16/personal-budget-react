import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import * as d3 from "d3";

const HomePage = () => {
  const fetchBudgetData = async () => {
    try {
      const response = await axios.get("/budget.json");
      const budgetData = response.data.myBudget;
      drawChartJS(budgetData);
      drawD3Chart(budgetData);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const drawChartJS = (budgetData) => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: budgetData.map((item) => item.title),
        datasets: [
          {
            label: "Budget",
            data: budgetData.map((item) => item.budget),
            backgroundColor: [
              "#ffcd56",
              "#ff6384",
              "#36a2eb",
              "#fd6b19",
              "#944336",
              "#e1066b",
              "#e729b4",
            ],
          },
        ],
      },
    });
  };

  const drawD3Chart = (budgetData) => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(budgetData.map((item) => item.title))
      .range(d3.schemeCategory10);

    const pie = d3
      .pie()
      .value((item) => item.budget)
      .sort(null);

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const arcs = svg
      .selectAll(".arc")
      .data(pie(budgetData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.title));

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${label.centroid(d)})`)
      .text((d) => d.data.title)
      .style("text-anchor", "middle");
  };

  return (
    <>
      <main className="center" id="main">
        <div className="page-area">
          <article>
            <h1>Stay on track</h1>
            <meta name="description" content="Tips for staying on track" />
            <p>
              <i>
                you know where you are spending your money? If you really stop
                to track it down, you would get surprised! Proper budget
                management depends on real data... and this app will help you
                with that!
              </i>
            </p>
          </article>

          <article>
            <h1>Alerts</h1>
            <meta name="description" content="Related Alerts" />
            <p>
              <i>
                What if your clothing budget ended? You will get an alert. The
                goal is to never go over the budget.
              </i>
            </p>
          </article>

          <article>
            <header>
              <h1>Results</h1>
            </header>
            <p>
              People who stick to a financial plan, budgeting every expense, get
              out of debt faster! Also, they to live happier lives... since they
              expend without guilt or fear... because they know it is all good
              and accounted for.
            </p>
          </article>

          <article>
            <h1>Free</h1>
            <p>
              This app is free!!! And you are the only one holding your data!
            </p>
          </article>

          <article>
            <header>
              <h1>Stay on track</h1>
            </header>
            <p>
              Do you know where you are spending your money? If you really stop
              to track it down, you would get surprised! Proper budget
              management depends on real data... and this app will help you with
              that!
            </p>
          </article>

          <article>
            <h1>Alerts</h1>
            <p>
              What if your clothing budget ended? You will get an alert. The
              goal is to never go over the budget.
            </p>
          </article>

          <article>
            <h1>Chart</h1>
            <p>
              <canvas id="myChart" width="2800px" height="2800px"></canvas>
            </p>
          </article>
          <div>
            <h1>D3js Chart</h1>
            <svg width="600" height="400" style={{ margin: "5px" }}></svg>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
