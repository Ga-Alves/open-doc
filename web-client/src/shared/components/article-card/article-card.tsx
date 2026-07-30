import Button from "../button/button";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type ArticleCardProps = {
  article: Article;
  onEdit?: (article: Article) => void;
  onDelete?: (id: string) => void;
};

export default function ArticleCard({
  article,
  onEdit,
  onDelete,
}: ArticleCardProps) {
  return (
    <article className="group relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <time>{new Date(article.createdAt).toLocaleDateString()}</time>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 tracking-tight">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {article.content}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={() => onEdit(article)}>
            Editar
          </Button>
        )}
        {onDelete && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(article.id)}
          >
            Deletar
          </Button>
        )}
      </div>
    </article>
  );
}
