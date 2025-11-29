import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import useService from "../../hooks/use-service";
import AdminService from "../../../services/auth-aware/AdminService";
import './reports.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Reports() {

    const adminService = useService(AdminService);

    const [report, setReport] = useState<{ destination: string; followers: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await adminService.getReport();
            setReport(data);
            setLoading(false);
        })();
    }, []);

    if (loading) return <p>Loading…</p>;

    const labels = report.map(r => r.destination);
    const counts = report.map(r => r.followers);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Followers",
                data: counts,
                backgroundColor: "rgba(14, 165, 233, 0.6)",
                borderColor: "#0ea5e9",
                borderWidth: 1,
                borderRadius: 10,
                hoverBackgroundColor: "rgba(14, 165, 233, 0.8)"
            }
        ]
    };

    const totalFollowers = counts.reduce((acc, val) => acc + val, 0);
    const topDestination = report.reduce(
        (top, curr) => (top && top.followers >= curr.followers ? top : curr),
        report[0]
    );

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#0f172a",
                padding: 10,
                cornerRadius: 12,
                titleColor: "#e2e8f0",
                bodyColor: "#cbd5e1"
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1, color: "#475569", font: { weight: 600 } },
                grid: { color: "rgba(148, 163, 184, 0.2)" }
            },
            x: {
                ticks: { color: "#475569", font: { weight: 600 } },
                grid: { display: false }
            }
        }
    };

    function downloadCSV() {
        let csv = "Destination, Followers\n";

        report.forEach(r => {
            csv += `${r.destination}, ${r.followers}\n`;
        });

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Vacation Followers.csv";
        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <div className="reports-page">
            <div className="reports-hero">
                <div>
                    <p className="reports-eyebrow">Insights</p>
                    <h2>Vacations Report</h2>
                    <p className="reports-subtitle">
                        Track which destinations win the most hearts and export the data anytime.
                    </p>
                </div>
                <div className="reports-stats">
                    <div className="stat-card">
                        <p className="stat-label">Total followers</p>
                        <p className="stat-value">{totalFollowers}</p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-label">Top destination</p>
                        <p className="stat-value">{topDestination?.destination ?? "—"}</p>
                        <span className="stat-pill">
                            {topDestination ? `${topDestination.followers} followers` : "No data"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="report-card chart-card">
                <div className="card-header">
                    <div>
                        <p className="card-eyebrow">Followers per destination</p>
                        <h3>Engagement bar chart</h3>
                    </div>
                </div>
                <div className="chart-wrapper">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            <div className="reports-actions">
                <button onClick={downloadCSV} className="download-btn">
                    Download CSV
                </button>
            </div>
        </div>
    );
}
