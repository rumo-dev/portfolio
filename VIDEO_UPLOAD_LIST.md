# AtmosFiore 動画公開準備リスト

動画はYouTubeへ未公開です。下記はAtmosFioreリポジトリ内にあるYMM4プロジェクトと撮影素材をもとにした公開候補です。書き出し、尺・音声・解像度の確認、YouTubeへのアップロードは未完了です。

## 先に用意する動画

| 優先度 | 動画 | 素材の状態 | 公開前に行うこと |
| --- | --- | --- | --- |
| 1 | AtmosFiore 技術ストーリー（約6分） | `AtmosFiore_就活デモ_技術ストーリー.ymmp` と参照素材あり | YMM4で最終再生し、素材パス・説明テロップ・音量を確認して書き出す。作品全体の第一候補。 |
| 2 | AtmosFiore 実装解説（約5分37秒） | `AtmosFiore_就活デモ_実装解説.ymmp` と参照素材あり | 同じく最終再生・音声確認後に書き出す。応募先に合わせた技術説明の差し替え版。 |

## 機能紹介用の短い動画

以下のMP4は撮影済みですが、単体公開向けの編集・説明・最終確認が必要です。長い総合デモを補足するものとして必要な機能だけ選びます。

| 候補 | 撮影素材 | 動きで見せる内容 |
| --- | --- | --- |
| 動的Sky | `Project/data/capture/screenshots/video/sky.mp4` | 時間変化する空の表現 |
| Volumetric Fog | `.../video/volumetric.mp4` | Froxelフォグと散乱の見え方 |
| 自動露出順応 | `.../video/adaptation.mp4` | 明暗変化への時間応答 |
| TAA | `.../video/taa.mp4` | 履歴合成の時間方向の挙動 |
| DLSS | `.../video/dlss.mp4` | 再構成前後の動的画面 |
| カリング | `frustum.mp4`、`meshlets.mp4`、`occlusion.mp4` | 視錐台・メッシュレット・遮蔽判定の表示と処理対象の変化 |
| Point Light Shadow | `.../video/point_shadow.mp4` | 点光源の移動に伴う影 |
| Animation | `.../video/animation.mp4` | glTFアニメーションの再生 |

## アップロード前の確認

- YMM4上で全素材のリンク切れがないことを確認します。プロジェクト内の素材パスは作業PC依存です。
- 最終書き出しを通しで再生し、説明と画面が一致すること、BGMとナレーションの音量を確認します。
- カリングの個数は撮影時のシーン情報として説明し、一般的な性能改善率とは表現しません。
- サムネイル、タイトル、概要欄、公開範囲を決めてからYouTubeへアップロードします。

## 参照元

- AtmosFiore `Project/demo_movie/README.md`
- AtmosFiore `Project/data/capture/screenshots/video/`
- AtmosFiore `Project/demo_movie/AtmosFiore_就活デモ_技術ストーリー.ymmp`
- AtmosFiore `Project/demo_movie/AtmosFiore_就活デモ_実装解説.ymmp`
