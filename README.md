## ローカル実行

- npm ci
- npm run dev

## 実装メモ

### TailwindCSS

- `items-center`で縦方向の中央揃え
- `justify-center`で横方向の中央揃え

### ページネーション

- ファイル名を`[...page].astro`にすることで、ページ番号のパスパラメータを省略した場合は1ページ目を表示（レストパラメータ）

### パス設計

- qiitaを参考にする
    - /tags → タグ一覧
    - /tags/rails → railsタグの記事一覧
    - /items/xxxx → ID:xxxxの記事
