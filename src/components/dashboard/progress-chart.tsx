"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [{ week: "S1", load: 40 }, { week: "S2", load: 42 }, { week: "S3", load: 45 }, { week: "S4", load: 47 }, { week: "S5", load: 50 }, { week: "S6", load: 52 }];
export function ProgressChart() { return <div><div className="h-64 w-full" role="img" aria-label="Evolución demostrativa de carga: de 40 a 52 kilos entre las semanas 1 y 6"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}><CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} /><XAxis dataKey="week" stroke="#AEB4BE" fontSize={12} /><YAxis stroke="#AEB4BE" fontSize={12} /><Tooltip contentStyle={{ background: "#181B1F", border: "1px solid #FFD400" }} /><Line type="monotone" dataKey="load" name="Carga kg" stroke="#FFD400" strokeWidth={3} dot={{ fill: "#FFD400" }} /></LineChart></ResponsiveContainer></div><table className="sr-only"><caption>Evolución semanal de carga</caption><tbody>{data.map((item) => <tr key={item.week}><th>{item.week}</th><td>{item.load} kg</td></tr>)}</tbody></table></div>; }

