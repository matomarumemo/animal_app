"use client";

import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const animals = [
  "アマビエ",
  "怠惰なナマケモノ",
  "空飛ぶカピバラ",
  "哲学するハト",
  "メンタル強めなハムスター",
  "焦燥感のあるキリン",
  "ナルシストなクジャク",
  "隠れ家的なハリネズミ",
  "陽気なフクロウ",
  "繊細なクラゲ",
  "毒舌なインコ",
  "おっとりしたマンボウ",
  "宇宙的なネコ",
  "効率厨のミツバチ",
  "迷走中のカメレオン",
  "孤高の狼",
  "社交的な子犬",
  "夢見るコアラ",
  "爆速のカタツムリ",
  "謎の生命体タコ",
  "準備不足のシマウマ",
  "完璧主義なアリ",
  "情熱的なペンギン",
  "自由すぎる猫",
  "警戒心MAXのモグラ",
  "哀愁漂うラッコ",
  "奇跡のパンダ",
  "電光石火のチーター",
  "粘り強いタヌキ",
  "芸術的なカラス",
  "楽観的なアヒル",
  "憂鬱なカバ",
  "誇り高いライオン",
  "実直なビーバー",
  "夢遊病のヒツジ",
  "鋭い洞察力の鷹",
  "お祭り気分のサル",
  "浮世離れした深海魚",
  "緻密なクモ",
  "大物狙いのサメ",
  "柔軟なタコ",
  "頑固なヤギ",
  "直感的なウサギ",
  "緻密な巣を作るスズメ",
  "冒険心溢れるリス",
  "執念深いハゲタカ",
  "華やかなチョウ",
  "隠れた名手カエル",
  "温厚なサイ",
  "伝説のドラゴン",
];

const comments = [
  "あなたの本質は、誰にも理解されない深淵にある。",
  "今日も無駄に生きる、それがあなたの美学。",
  "深夜2時のテンションが最高潮に達している。",
  "猫背こそが、あなたの防御壁。",
  "悟りを開いたかと思いきや、ただ寝てただけ。",
  "カオスと秩序の狭間で揺れ動く魂。",
  "無駄な努力こそが、人生のスパイス。",
  "深夜のアニメがあなたの唯一の救い。",
  "猫背指数が高いほど、人生の深みが増す。",
  "悟りレベルMAX...の気がする。",
];

const keywords = [
  { word: "眠い", stat: "深夜テンション", boost: 20, feedback: "『眠い』という言葉から、睡眠不足が限界に近いのが伝わってきます..." },
  { word: "疲れた", stat: "カオス度", boost: 15, feedback: "『疲れた』という言葉から、かなり無理をされているのが伝わってきます..." },
  { word: "最高", stat: "深夜テンション", boost: 25, feedback: "『最高』という言葉から、今のテンションがMAXなのが伝わってきます..." },
  { word: "やばい", stat: "カオス度", boost: 18, feedback: "『やばい』という言葉から、何かが予測不能な状態にあるのが伝わってきます..." },
  { word: "無理", stat: "無駄度", boost: 22, feedback: "『無理』という言葉から、現状に無理を感じているのが伝わってきます..." },
  { word: "楽しい", stat: "深夜テンション", boost: 15, feedback: "『楽しい』という言葉から、ポジティブなエネルギーを感じ取れます..." },
  { word: "辛い", stat: "猫背指数", boost: 20, feedback: "『辛い』という言葉から、心身ともに負担がかかっているのが伝わってきます..." },
  { word: "わからん", stat: "悟りレベル", boost: 25, feedback: "『わからん』という言葉から、悟りの境地に近づいているのか、単に諦めているのか..." },
  { word: "適当", stat: "無駄度", boost: 30, feedback: "『適当』という言葉から、無駄を楽しむ才能の片鱗が見えます..." },
  { word: "死にたい", stat: "カオス度", boost: 35, feedback: "『死にたい』という言葉から、精神的なカオスが極まっているのが伝わってきます..." },
  { word: "生きてる", stat: "悟りレベル", boost: 15, feedback: "『生きてる』という言葉から、生への執着と悟りの狭間にいるのが伝わってきます..." },
  { word: "仕事", stat: "カオス度", boost: 20, feedback: "『仕事』という言葉から、社会的なプレッシャーを感じているのが伝わってきます..." },
  { word: "寝たい", stat: "深夜テンション", boost: 25, feedback: "『寝たい』という言葉から、深夜テンションが高まっているのが伝わってきます..." },
  { word: "面白い", stat: "深夜テンション", boost: 18, feedback: "『面白い』という言葉から、好奇心旺盛な性格が伝わってきます..." },
  { word: "つらい", stat: "猫背指数", boost: 22, feedback: "『つらい』という言葉から、背中が丸くなるほどの負担を感じているのが伝わってきます..." },
  { word: "頑張る", stat: "カオス度", boost: 20, feedback: "『頑張る』という言葉から、かなり無理をされているのが伝わってきます..." },
  { word: "忙しい", stat: "カオス度", boost: 25, feedback: "『忙しい』という言葉から、時間に追われているのが伝わってきます..." },
  { word: "休みたい", stat: "深夜テンション", boost: 20, feedback: "『休みたい』という言葉から、休息を求める魂の叫びが聞こえてきます..." },
  { word: "やる気", stat: "深夜テンション", boost: 15, feedback: "『やる気』という言葉から、まだ燃え尽きていないのが伝わってきます..." },
  { word: "めんどくさい", stat: "無駄度", boost: 28, feedback: "『めんどくさい』という言葉から、無駄を極端に嫌う傾向が見えます..." },
];

const getStatExplanation = (name: string, value: number) => {
  if (value >= 80) {
    const explanations: Record<string, string> = {
      カオス度: "異常値（予測不能な動きをします）",
      無駄度: "伝説級（無駄を楽しむ才能があります）",
      深夜テンション: "危険域（深夜2時がピークです）",
      猫背指数: "完璧（防御壁として機能中）",
      悟りレベル: "仏陀級（何もかも悟った気がします）",
    };
    return explanations[name] || "高め";
  } else if (value >= 60) {
    const explanations: Record<string, string> = {
      カオス度: "高め（予測不能な動きをします）",
      無駄度: "プロ級（無駄を楽しむ才能があります）",
      深夜テンション: "高め（深夜に活発化します）",
      猫背指数: "高め（防御壁として機能中）",
      悟りレベル: "高め（悟りの道を歩んでいます）",
    };
    return explanations[name] || "高め";
  } else if (value >= 40) {
    return "普通（平均的なレベルです）";
  } else {
    const explanations: Record<string, string> = {
      カオス度: "低め（意外とまともです）",
      無駄度: "効率厨（無駄を嫌います）",
      深夜テンション: "低め（早寝早起きタイプ）",
      猫背指数: "低め（姿勢が良いです）",
      悟りレベル: "低め（まだ迷い中です）",
    };
    return explanations[name] || "低め";
  }
};

export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    animal: string;
    stats: { name: string; value: number }[];
    comment: string;
    rationale: string;
    feedback: string;
  } | null>(null);

  const handleDiagnosis = () => {
    setIsLoading(true);

    setTimeout(() => {
      const charCode = input.length > 0 ? input.charCodeAt(0) : 0;
      const randomSeed = Math.random();
      const index = Math.floor((charCode + randomSeed * 1000) % animals.length);
      const selectedAnimal = animals[index];

      // Extract keywords from input
      const detectedKeywords = keywords.filter((keyword) =>
        input.includes(keyword.word)
      );

      // Generate stats with keyword boosts
      const stats = [
        { name: "カオス度", value: Math.floor(randomSeed * 100) },
        { name: "無駄度", value: Math.floor((randomSeed * 0.7 + 0.3) * 100) },
        { name: "深夜テンション", value: Math.floor((randomSeed * 0.5 + 0.5) * 100) },
        { name: "猫背指数", value: Math.floor((randomSeed * 0.8 + 0.2) * 100) },
        { name: "悟りレベル", value: Math.floor((randomSeed * 0.6 + 0.4) * 100) },
      ];

      // Apply keyword boosts
      detectedKeywords.forEach((keyword) => {
        const statIndex = stats.findIndex((s) => s.name === keyword.stat);
        if (statIndex !== -1) {
          stats[statIndex].value = Math.min(
            100,
            stats[statIndex].value + keyword.boost
          );
        }
      });

      const commentIndex = Math.floor(randomSeed * comments.length);
      const selectedComment = comments[commentIndex];

      // Generate rationale
      let rationale = "";
      let feedback = "";
      if (detectedKeywords.length > 0) {
        const keyword = detectedKeywords[0];
        const boostedStat = stats.find((s) => s.name === keyword.stat);
        rationale = `入力したテキストの「${keyword.word}」という単語から、あなたの${keyword.stat}が${boostedStat?.value}%と判定されました。`;
        feedback = keyword.feedback;
      } else {
        rationale = `入力文字数${input.length}文字と宇宙的なランダム性から、あなたの本質が${selectedAnimal}であることが判明しました。`;
        feedback = "あなたの入力から、独特な波長を感じ取れました...";
      }

      setResult({
        animal: selectedAnimal,
        stats,
        comment: selectedComment,
        rationale,
        feedback,
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          意識低い系：性格診断ジェネレーター
        </h1>

        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="自由にテキストを入力してください..."
            className="w-full h-32 p-4 bg-gray-800 border-2 border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
          />
          <button
            onClick={handleDiagnosis}
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "診断中..." : "診断実行"}
          </button>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-xl text-gray-300 animate-pulse">診断中...</p>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gray-800 rounded-lg p-6 border-2 border-cyan-400 shadow-lg shadow-cyan-400/30">
              <h2 className="text-2xl font-bold text-center mb-4 text-cyan-400">
                診断結果
              </h2>
              <p className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {result.animal}
              </p>
              <p className="text-center text-lg text-gray-300 italic mb-4">
                "{result.comment}"
              </p>
              <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-300">
                  <span className="text-cyan-400 font-bold">診断の根拠：</span>
                  {result.rationale}
                </p>
              </div>
              <div className="mt-4 p-4 bg-purple-900/30 rounded-lg border border-purple-500/50">
                <p className="text-sm text-gray-300">
                  <span className="text-purple-400 font-bold">AI解析：</span>
                  {result.feedback}
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border-2 border-pink-500 shadow-lg shadow-pink-500/30">
              <h3 className="text-xl font-bold text-center mb-4 text-pink-400">
                面白バロメーター
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={result.stats}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis
                      dataKey="name"
                      tick={{ fill: "#ffffff", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "#9ca3af", fontSize: 10 }}
                    />
                    <Radar
                      name="Stats"
                      dataKey="value"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.5}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border-2 border-purple-500 shadow-lg shadow-purple-500/30">
              <h3 className="text-xl font-bold text-center mb-4 text-purple-400">
                あなたの性格の強み・弱み
              </h3>
              <ul className="space-y-3">
                {result.stats.map((stat) => (
                  <li
                    key={stat.name}
                    className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600"
                  >
                    <span className="text-pink-400 font-bold min-w-[80px]">
                      {stat.name}：
                    </span>
                    <span className="text-gray-300">
                      {getStatExplanation(stat.name, stat.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
