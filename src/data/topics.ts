// ============================================================
// 技術解説（/reference/*）の「要点」データ。
// - 各ページ冒頭の要点カード（TopicSummary）と、一覧ページ（reference/index.mdx）で使います。
// - slug は src/content/docs/reference/<slug>.mdx のファイル名と一致させてください。
// - featured: true のものは「まずここから」として一覧の先頭に表示されます。
// ============================================================

export type CategoryKey = "foundation" | "lighting" | "globalIllumination" | "screenSpace" | "atmosphere" | "post" | "system";
export const categoryOrder: CategoryKey[] = ["foundation", "lighting", "globalIllumination", "screenSpace", "atmosphere", "post", "system"];

export const categories: Record<CategoryKey, { label: string; lead: string }> = {
  foundation: {
    label: "描画基盤",
    lead: "ディファードレンダリングとマテリアルの土台。",
  },
  lighting: {
    label: "光源・影・環境光",
    lead: "光源の種類、影の生成、環境光の計算。",
  },
  globalIllumination: {
    label: "間接光・GI",
    lead: "Voxel radiance と動的プローブを組み合わせた間接照明。",
  },
  screenSpace: {
    label: "画面空間・時間方向",
    lead: "画面バッファや前フレームを使う描画効果。",
  },
  atmosphere: {
    label: "空・フォグ",
    lead: "大気散乱やフォグで空間の奥行きを作る。",
  },
  post: {
    label: "ポストプロセス・カメラ",
    lead: "HDR から最終画面までの画づくりと管理。",
  },
  system: {
    label: "エンジン・開発支援",
    lead: "カメラ、並列処理、音声、デバッグ機能。",
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
  {
  "slug": "model-pipeline",
  "category": "foundation",
  "name": "glTF Model Pipeline",
  "summary": "glTFモデルのノード・スキン・材質・アニメーションと描画パスの管理。",
  "points": [
    "Deferred・Forward・Shadowを区別",
    "モデル更新のCPU処理を並列化と接続"
  ],
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
  "slug": "camera-system",
  "category": "system",
  "name": "Camera System",
  "summary": "共通インターフェースで視点を切り替え、撮影パラメータをポスト処理へ渡すカメラ管理。",
  "points": [
    "名前でカメラを登録・切替",
    "未登録時はNullCameraへフォールバック"
  ],
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
  "slug": "debug-tools",
  "category": "system",
  "name": "開発支援",
  "summary": "中間バッファの可視化、Tracy計測区間、リソース監視を組み合わせた開発支援。",
  "points": [
    "G-Bufferや影の中間結果をプレビュー",
    "CPU・メモリ・FPS履歴をGUIで表示"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
  "slug": "job-system",
  "category": "system",
  "name": "Job System",
  "summary": "再利用するワーカープールでモデルのアニメーション更新を分担。",
  "points": [
    "少量の仕事は逐次処理へ切り替え",
    "GPU操作を描画スレッドに限定"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
  "slug": "dlss",
  "category": "foundation",
  "name": "DLSS",
  "summary": "NGX経由のDLSS接続と、内部描画解像度に追従するリソース管理。",
  "points": [
    "カラー・深度・モーションベクトルを入力",
    "利用可否と失敗理由を保持"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
  "slug": "taa",
  "category": "screenSpace",
  "name": "TAA",
  "summary": "モーションベクトルによる再投影と、近傍クランプを用いた履歴合成。",
  "points": [
    "2枚の履歴バッファを交互に使用",
    "投影ジッターを無効化してカメラ射影を安定化"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
  "slug": "ssgi",
  "category": "screenSpace",
  "name": "SSGI",
  "summary": "半解像度・8方向のサンプルで、画面内のカラーから拡散間接光を近似。",
  "points": [
    "受光面と送光面の法線で重み付け",
    "間接光単体のデバッグ表示を用意"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
  "slug": "ssr",
  "category": "screenSpace",
  "name": "SSR",
  "summary": "投影した反射レイを深度と比較し、半解像度で画面内の映り込みを求める実装。",
  "points": [
    "透視補正した深度でレイを探索",
    "粗さ・金属度で対象を限定し、画面端で減衰"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
  "slug": "ssao",
  "category": "screenSpace",
  "name": "SSAO",
  "summary": "G-Bufferを再利用し、半解像度の24サンプルAOと輪郭を保つフィルタを実装。",
  "points": [
    "画面内の位置・法線から遮蔽を推定",
    "水平・垂直の13タップフィルタとアップサンプル"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  // ---------- 描画基盤 ----------
  {
  "slug": "gbuffer",
  "category": "foundation",
  "name": "G-Buffer",
  "summary": "材質用4RTに深度と独立したモーションベクトルを組み合わせる描画基盤。",
  "points": [
    "既存の材質レジスタ配置を維持",
    "1080pの理論容量を内訳付きで整理"
  ],
  "featured": true,
  "related": [
    "deferred-lighting",
    "taa",
    "dlss"
  ]
},
  {
  "slug": "deferred-lighting",
  "category": "foundation",
  "name": "Deferred Lighting",
  "summary": "4種類の光源、IBL、材質AOとSSAOをフルスクリーンの照明パスで合成。",
  "points": [
    "材質情報をG-Bufferから共通参照",
    "半透明は別のForwardパスへ分離"
  ],
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},
  {
    slug: "pbr",
    category: "foundation",
    name: "Physical Material (PBR)",
    summary: "glTF Metallic-Roughnessを基礎に、材質パラメータから反射を計算。",
    points: [
      "glTF の pbrMetallicRoughness ワークフローに準拠",
      "Metallic パラメータ1つで金属・非金属を滑らかに補間",
    ],
    basis: "glTF 2.0 Specification",
    related: ["gltf-pbr", "gbuffer", "ibl", "deferred-lighting"],
  },
  {
    slug: "gltf-pbr",
    category: "foundation",
    name: "glTF PBR材質",
    summary: "標準材質とKHR_materials拡張を読み込み、Deferred / Forwardへ振り分け。",
    points: [
      "clearcoat・sheen・anisotropy・iridescenceに対応",
      "transmission・volume・dispersionをForwardで近似",
    ],
    related: ["pbr", "model-pipeline", "gbuffer"],
  },
  {
    slug: "culling",
    category: "foundation",
    name: "Model / Meshlet Culling",
    summary: "視錐台と前フレームの遮蔽結果でモデル・メッシュレットの描画を省略。",
    points: [
      "モデルAABBと最大64頂点・126三角形のメッシュレットを判定",
      "静的モデルを対象にクエリ予算付きの遮蔽カリングを実行",
    ],
    related: ["model-pipeline", "debug-tools", "shadow-mapping"],
  },
  {
  "slug": "post-effect-manager",
  "category": "post",
  "name": "Post Effect Manager",
  "summary": "13項目のエフェクト順序・有効状態と、画面空間処理を統括。",
  "points": [
    "順序・設定をGUIで編集しJSONへ保存",
    "DLSS・TAAと描画解像度の状態を管理"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
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
  "slug": "area-light",
  "category": "lighting",
  "name": "Area Light",
  "summary": "64×64の行列・振幅LUTを参照して面光源のBRDF積分を近似。",
  "points": [
    "粗さと視線角からLUTを参照",
    "矩形・ディスク・球形の形状を扱う"
  ],
  "featured": true,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
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
    slug: "voxel-gi",
    category: "globalIllumination",
    name: "Voxel GI",
    summary: "静的シーンを32³〜256³のボクセルへ焼き込み、拡散間接光とDDGIの入力に利用。",
    points: [
      "32³〜256³から選べるボリュームへ材質・法線・発光を記録（初期値64³）",
      "再ベイク可能な静的ボリュームをDDGIの入力にも利用",
    ],
    related: ["ddgi", "ssgi", "ibl"],
  },
  {
    slug: "ddgi",
    category: "globalIllumination",
    name: "DDGI",
    summary: "Voxel GIを参照してプローブ照明を時間更新し、間接光を補間。",
    points: [
      "プローブ格子の放射輝度を履歴とフィルタで安定化",
      "シーン光源を注入し、ボリュームフォグの照明入力にも接続",
    ],
    related: ["voxel-gi", "fog", "ssgi"],
  },
  {
  "slug": "shadow-mapping",
  "category": "lighting",
  "name": "Shadow Mapping",
  "summary": "平行光の深度マップと、4×4アトラスに格納する複数点光源の双放物面シャドウ。",
  "points": [
    "前後2枚の点光源アトラス",
    "継ぎ目・タイル境界・バイアスを調整"
  ],
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
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
  "slug": "fog",
  "category": "atmosphere",
  "name": "Fog System",
  "summary": "距離・指数・高さフォグと、80×48×128のFroxelで計算するボリュームフォグ。",
  "points": [
    "4種類のフォグを個別に調整",
    "光の注入と視線方向の累積を分離"
  ],
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
},

  // ---------- ポストプロセス ----------
  {
  "slug": "dof",
  "category": "post",
  "name": "Depth of Field",
  "summary": "CoCを使い、Scatter・累積和・Resolveでボケ画像を構築。",
  "points": [
    "単一デルタバッファに寄与を蓄積",
    "焦点・ボケ範囲をデバッグ表示"
  ],
  "featured": false,
  "related": [
    "gbuffer",
    "post-effect-manager"
  ]
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
      "既定順ではHDR処理の後に配置。順序編集時は表示変換との整合性を確認",
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
