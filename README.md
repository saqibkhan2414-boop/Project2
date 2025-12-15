Project Two: Logistics Fleet Operations Analytics Dashboard

Project Overview and Core Components
This dashboard demonstrates proficiency in full-stack data visualization by creating a single-page, responsive interface for a synthetic Logistics and Fleet Operations company. The project separates concerns across three main components: Presentation, Logic, and Data.

 1. The Presentation Layer (`dashboard.html`)
Role: Defines the user interface and overall structure.
What it contains: The file is composed of the Bootstrap 5 responsive grid layout, essential libraries (Bootstrap and Chart.js), and five unique `<canvas>` tags that serve as empty placeholders for the visualizations.
Function: Ensures the dashboard is visually organized and adapts correctly to any screen size (desktop or mobile).

2. The Application Logic (`script.js`)
Role: The 'brain' of the dashboard, responsible for all data acquisition and rendering.
What it contains: Custom JavaScript functions that implement the required Data Getter Approach using `fetch` and `async/await`. These functions also contain the transformation logic needed to prepare the raw data for Chart.js (e.g., aggregation for the Bar Chart, coordinate mapping for the Scatter Plot).
Function: Independently retrieves the five data files, processes the raw data, and initializes the five distinct Chart.js objects (Bar, Radar, Line, Pie, Scatter).

 3. The Data Layer (`data/` folder):
Role: Stores the five raw, unique data sources used for analysis.
What it contains: Five separate synthetic CSV files (e.g., `fuel_data.csv`, `rating_data.csv`, etc.).
Function: Provides the analytical content for the dashboard, adhering to the industry context of logistics and fleet metrics.

Key Technical Achievement: Deployment
A critical step was the deployment environment. Since web browsers block JavaScript from fetching local data files directly (due to security restrictions), the project required running a simple local web server. The charts were successfully rendered by using Python's built-in `http.server` module to simulate a live web environment, which correctly loaded all data files.

How to Run the Project Locally:
1) Open Powershell/Terminal within the 'Project2' directory
2) Use the following command once in the appropriate directory: python -m http.server 8000
3) Open a web browser and type in the following URL: http://localhost:8000/dashboard.html

    
Video Explanation
This video provides a guided tour of the working dashboard, explaining the layout, the analytical purpose of each visualization, and the high-level technical structure.


<iframe width="700" height="394" src="https://www.youtube.com/embed/Ct27BXzqfy0" title="Project Two Dashboard Explanation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
