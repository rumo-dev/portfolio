// ============================================================
// 技術解説（/reference/*）の「要点」データ。
// - 各ページ冒頭の要点カード（TopicSummary）と、一覧ページ（reference/index.mdx）で使います。
// - slug は src/content/docs/reference/<slug>.mdx のファイル名と一致させてください。
// - featured: true のものは「まずここから」として一覧の先頭に表示されます。
// ============================================================

export type CategoryKey = "foundation" | "lighting" | "atmosphere" | "post" | "system";

export const categories: Record<CategoryKey, { label: string; lead: string }> = {
  foundation: {
    label: "描画基盤",
    lead: "ディファードレンダリングとマテリアルの土台。",
  },
  lighting: {
    label: "ライティング・影",
    lead: "光源の種類ごとの実装と、影・環境光。",
  },
  atmosphere: {
    label: "大気・空間表現",
    lead: "空とフォグで空間の奥行きを作る。",
  },
  post: {
    label: "ポストプロセス",
    lead: "HDR から最終画面までのカメラ・レンズ表現。",
  },
  system: {
    label: "その他システム",
    lead: "描画以外のエンジン機能。",
  },
};

export interface Topic {
  slug: string;
  category: CategoryKey;
  /** 一覧用の短い名前 */
  name: string;
  /** 1行で「何を作ったか」 */
  summary: string;
  /** 実装上の見どころ（2〜3個） */
  points: string[];
  /** 参考にした論文・資料（任意） */
  basis?: string;
  /** 「まずここから」に出すか */
  featured?: boolean;
  /** 関連ページ（slug） */
  related?: string[];
}

export const topics: Topic[] = [
  // ---------- 描画基盤 ----------
  {
    slug: "gbuffer",
    category: "foundation",
    name: "G-Buffer",
    summary: "法線・アルベド・位置・エミッシブを4枚のレンダーターゲットに格納するディファード用バッファ。",
    points: [
      "1080p で1フレーム約64MBの消費を把握し、フォーマットを最小限に整理",
      "DirectX 11 の SRV/RTV 同時バインド禁止に、Activate/Deactivate の対で対応",
      "ビューポートとレンダーターゲットを退避・復元し、他パスへの影響を排除",
    ],
    featured: true,
    related: ["deferred-lighting", "pbr", "post-effect-manager"],
  },
  {
    slug: "deferred-lighting",
    category: "foundation",
    name: "Deferred Lighting",
    summary: "G-Buffer を読み出し、平行・点・スポット・面光源をすべて1パスで合成するライティングパス。",
    points: [
      "光源を StructuredBuffer で渡し、シェーダー内ループで可変光源数に対応",
      "光源の種類ごとに専用のシャドウサンプリング関数を呼び分け",
    ],
    related: ["gbuffer", "point-light", "area-light"],
  },
  {
    slug: "pbr",
    category: "foundation",
    name: "Physical Material (PBR)",
    summary: "Albedo・Metallic・Roughness で素材の質感を物理的に表現するマテリアル。",
    points: [
      "glTF の pbrMetallicRoughness ワークフローに準拠",
      "Metallic パラメータ1つで金属・非金属を滑らかに補間",
    ],
    basis: "glTF 2.0 Specification",
    related: ["gbuffer", "ibl", "deferred-lighting"],
  },
  {
    slug: "post-effect-manager",
    category: "foundation",
    name: "Post Effect Manager",
    summary: "12種類のポストエフェクトを1本のパイプラインとして統括する管理クラス。",
    points: [
      "各エフェクトは互いを参照せず、SRV の受け渡しだけを管理クラスが仲介（疎結合）",
      "エフェクトの追加・削除・順序変更が draw() の数行の変更で済む",
      "各エフェクトの中間バッファを ImGui でプレビューしながら調整できる",
    ],
    featured: true,
    related: ["tone-mapping", "bloom", "dof"],
  },

  // ---------- ライティング・影 ----------
  {
    slug: "directional-light",
    category: "lighting",
    name: "Directional Light",
    summary: "太陽光などの平行光を、時刻連動の昼夜サイクルと手動操作の両方で制御。",
    points: [
      "auto_rotate フラグ1つで、時刻ベースの自動更新と GUI での手動操作を排他的に切り替え",
      "直交投影によるシャドウマッピングと連携",
    ],
    related: ["shadow-mapping", "sky", "area-light"],
  },
  {
    slug: "point-light",
    category: "lighting",
    name: "Point Light",
    summary: "電球やランプのような点光源を、フラスタムカリングと StructuredBuffer で大量に扱う実装。",
    points: [
      "Dynamic バッファを毎フレーム Map(WRITE_DISCARD) で更新し、ライトを自由に追加・削除・移動",
      "フラスタムカリングで画面外のライトを除外",
      "最大1024灯のハードリミットを設けて GPU 側の配列サイズを固定",
    ],
    related: ["spot-light", "shadow-mapping", "deferred-lighting"],
  },
  {
    slug: "spot-light",
    category: "lighting",
    name: "Spot Light",
    summary: "内側・外側の角度でコーン状に減衰する、懐中電灯のような方向性光源。",
    points: [
      "Point Light と同じ管理パターン（StructuredBuffer・カリング・動的更新）を踏襲し、コード規約を統一",
      "減衰が0以下になった時点で早期 continue し、不要な BRDF 計算を省略",
    ],
    related: ["point-light", "deferred-lighting"],
  },
  {
    slug: "area-light",
    category: "lighting",
    name: "Area Light（LTC）",
    summary: "窓やパネルライトのような面光源を、LTC で矩形・円形・球形に対応して正確に積分。",
    points: [
      "LUT テクスチャを使わない Textureless 近似で軽量に動作",
      "Diffuse と Specular で変換行列を使い分け、ヤコビアン正規化でエネルギーを保存",
      "Directional Light と露出スケールを統一し、光源間の明るさを揃える",
    ],
    basis: "Heitz et al., Linearly Transformed Cosines (2016)",
    featured: true,
    related: ["deferred-lighting", "directional-light", "pbr"],
  },
  {
    slug: "ibl",
    category: "lighting",
    name: "IBL",
    summary: "HDR 環境マップから拡散・鏡面の環境光を求める Image-Based Lighting。",
    points: [
      "拡散 IEM・鏡面 PMREM・BRDF LUT の3種類を事前計算して利用",
      "Split-Sum 近似でリアルタイムに環境光を積分",
    ],
    basis: "Split-Sum 近似（Karis, 2013）",
    related: ["pbr", "sky"],
  },
  {
    slug: "shadow-mapping",
    category: "lighting",
    name: "Shadow Mapping",
    summary: "平行光は直交投影＋PCF、点光源は双放物面マッピング、さらにコンタクトシャドウを実装。",
    points: [
      "R24G8_TYPELESS で確保し、書き込み用 DSV と読み出し用 SRV を同一リソースから作成",
      "光源の種類ごとに投影方式を変えて精度とコストを両立",
      "現状は点光源1灯のみ影に対応（制約として明記）",
    ],
    featured: false,
    related: ["directional-light", "point-light"],
  },

  // ---------- 大気・空間表現 ----------
  {
    slug: "sky",
    category: "atmosphere",
    name: "Sky",
    summary: "レイマーチングによる大気散乱で空を描き、雲・星・オーロラを手続き的に合成。",
    points: [
      "星・雲・オーロラをすべてテクスチャなしで生成（ハッシュノイズ＋FBM）し、アセット容量を増やさない",
      "Reversed-Z に対応した深度判定",
    ],
    related: ["fog", "directional-light", "ibl"],
  },
  {
    slug: "fog",
    category: "atmosphere",
    name: "Fog System",
    summary: "距離・指数・高さ・ボリュームの4方式を多段合成するフォグ。ボリュームは Froxel ベース。",
    points: [
      "共通インターフェース FogBase により、新しい方式を追加しても管理側は無変更",
      "Froxel グリッドを 160×90×128 に抑え、品質と性能のバランスを確保",
    ],
    related: ["sky", "post-effect-manager"],
  },

  // ---------- ポストプロセス ----------
  {
    slug: "dof",
    category: "post",
    name: "Depth of Field",
    summary: "AMD の Fast Filter Spreading を Compute Shader で実装した、散乱方式の被写界深度。",
    points: [
      "InterlockedAdd により、各ピクセルが周囲へ寄与を撒く「真の Scatter」を実現",
      "フィルタサイズに対して O(1) のコストで大きなボケを表現",
    ],
    basis: "Hillesland & Skelton, Cinematic Depth of Field (AMD, GDC 2017)",
    featured: true,
    related: ["exposure", "bloom", "post-effect-manager"],
  },
  {
    slug: "exposure",
    category: "post",
    name: "Exposure",
    summary: "T値・シャッタースピード・ISO から物理的な EV100 を算出し、HDR に線形の露出を適用。",
    points: [
      "線形 HDR 空間のスケーリングのみを担当し、トーンマッピングと責務を分離",
      "Bloom の前段・後段どちらにも置ける柔軟なパイプライン配置",
    ],
    related: ["adaptation", "tone-mapping"],
  },
  {
    slug: "adaptation",
    category: "post",
    name: "Adaptation（自動露出）",
    summary: "シーンの明るさに応じて露出を自動調整し、目の順応を再現。",
    points: [
      "露出値を 1×1 の R32_FLOAT テクスチャに保持し、前フレームから滑らかに遷移",
      "明→暗と暗→明で順応速度を変え、実際の目の特性を再現",
      "露出を 0.05〜10.0 にクランプして極端な値を防止",
    ],
    related: ["exposure", "tone-mapping"],
  },
  {
    slug: "bloom",
    category: "post",
    name: "Bloom",
    summary: "高輝度部分の抽出と多段ガウシアンブラーによる発光表現。",
    points: [
      "6段階のダウンサンプルによるミップチェイン方式で、低コストに広がりのある発光を得る",
      "ピンポンバッファでメモリ確保を最小化",
      "設計判断（なぜこの手法か）を比較検討つきで記載",
    ],
    related: ["tone-mapping", "dof", "post-effect-manager"],
  },
  {
    slug: "tone-mapping",
    category: "post",
    name: "Tone Mapping",
    summary: "HDR の高輝度カラーを SDR ディスプレイ向けに変換する、34種類のアルゴリズムの実装。",
    points: [
      "全アルゴリズムを1つの .hlsli に集約し、再コンパイルなしで実行時に切り替え",
      "ACES Filmic を既定としつつ、用途に応じて比較できるように設計",
      "パイプライン最終段に配置し、それ以前をすべて線形 HDR で処理",
    ],
    featured: true,
    related: ["adaptation", "exposure", "bloom"],
  },
  {
    slug: "chromatic-aberration",
    category: "post",
    name: "Chromatic Aberration",
    summary: "波長ごとの屈折率の違いによる RGB のズレを再現する色収差。",
    points: [
      "CPU はアーティスト向けの強度のみ渡し、物理スケーリングはシェーダー内で完結",
      "Physical Link で、焦点距離・F値に連動するモードと単純なモードを切り替え",
    ],
    related: ["lens-distortion", "vignetting"],
  },
  {
    slug: "lens-distortion",
    category: "post",
    name: "Lens Distortion",
    summary: "ブラウン–コンラディモデルの k1 項で、樽型・糸巻き型の歪みを再現するレンズ歪曲。",
    points: [
      "k1 == 0 を「FoV から自動計算する」合図として使い、アーティスト指定と物理連動を両立",
      "色収差・周辺減光と並ぶ「レンズ起因の収差」として一括配置",
    ],
    basis: "Brown–Conrady 歪曲モデル",
    related: ["chromatic-aberration", "vignetting"],
  },
  {
    slug: "vignetting",
    category: "post",
    name: "Vignetting",
    summary: "cos⁴則による物理モデルと、アーティストカーブの2モードを切り替えられる周辺減光。",
    points: [
      "モードごとに必要なパラメータだけを GUI に表示し、調整しやすさを確保",
    ],
    related: ["lens-distortion", "chromatic-aberration"],
  },

  // ---------- その他システム ----------
  {
    slug: "audio-engine",
    category: "system",
    name: "Audio Engine",
    summary: "XAudio2 / X3DAudio による BGM・SE の多重再生と、3D 空間オーディオ。",
    points: [
      "エフェクトチェーンを JSON で管理し、コードを変えずに調整可能",
      "X3DAudio で音源の位置に応じた空間定位を実装",
    ],
    related: ["post-effect-manager"],
  },
];

export const topicBySlug = (slug: string) => topics.find((t) => t.slug === slug);
