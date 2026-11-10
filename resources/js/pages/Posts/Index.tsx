// resources/js/pages/Posts/Index.tsx
import { Head } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    created_at: string;
}

interface Props {
    posts: Post[];
}

export default function Index({ posts }: Props) {
    return (
        <>
            <Head title="Posts" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">All Posts</h1>
                <ul className="space-y-2">
                    {posts.map((post) => (
                        <li key={post.id} className="p-4 bg-white rounded shadow">
                            <h2 className="font-semibold">{post.title}</h2>
                            <p className="text-sm text-gray-500">
                                {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}