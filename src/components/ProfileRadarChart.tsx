import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { ProfileScores } from '@/data/charismaData';

interface ProfileRadarChartProps {
  scores: ProfileScores;
}

export const ProfileRadarChart = ({ scores }: ProfileRadarChartProps) => {
  const data = [
    { dimension: 'Sensível', value: scores.S, fullMark: 12 },
    { dimension: 'Racional', value: scores.R, fullMark: 12 },
    { dimension: 'Vibrante', value: scores.V, fullMark: 12 },
    { dimension: 'Sereno', value: scores.P, fullMark: 12 },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 12]} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <Radar
            name="Perfil"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.4}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
