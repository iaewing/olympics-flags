import {Head, router, useForm} from '@inertiajs/react';
import {useState} from "react";


export default function Welcome({ answer }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const { data, setData, post, progress } = useForm({
        name: null,
        image: null,
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (data.image) {
            console.log('selectedFile', selectedFile)
            post('/api/claude-van-damme', {image: data.image});
        } else {
            console.log('No file selected');
        }
    };

    return (
        <>
            <Head title="Welcome"/>
            <div>Welcome sup dude (results may not be accurate, usually, and mostly)</div>
            <form onSubmit={handleSubmit}>
                <input type="file" value={data.avatar} onChange={e => setData('image', e.target.files[0])} />
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                <br/>
                <button type="submit" className="bg-gray-300">Submit to claude</button>
            </form>
            <div>{answer}</div>
        </>
    );
}

