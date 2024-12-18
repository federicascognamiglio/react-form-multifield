import { useState } from 'react'
import articles from '../data/articles';

// Valori di partenza Form
const initialFormData = {
    title: "",
    image: "",
    content: "",
    category: "",
    state: ""
};

function AppArticles() {
    const [articlesList, setArticlesList] = useState(articles);

    // Valori per form
    const [formData, setFormData] = useState(initialFormData);

    // Submit Function
    const handleSubmit = (event) => {
        event.preventDefault()
        const newArticle = {
            ...formData,
            id: Date.now(),
        }
        setArticlesList([...articlesList, newArticle]);
        setFormData(initialFormData)
    }

    // InputChange Function
    const handleChange = (event) => {
        const keyToChange = event.target.name;
        let newValue;
        (event.target.type === "checkbox") ? (newValue = event.target.checked) : (newValue = event.target.value)
        const newData = {
            ...formData,
            [keyToChange]: newValue
        }
        setFormData(newData)
    }

    // Delete Function
    const handleDelete = (idToDelete) => {
        const filteredList = articlesList.filter(curArticle => curArticle.id !== idToDelete)
        setArticlesList(filteredList);
    }

    return (
        <>
            {/* Form */}
            <section className="pt-4">
                <h3>Add Article</h3>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className='w-50'>
                        <label htmlFor="articleTitle" className='form-label'>Article Title</label>
                        <input name='title' className='form-control' value={formData.title} onChange={handleChange} type="text" id='articleTitle' />
                    </div>
                    {/* <div className="w-50 mt-3">
                        <label htmlFor="articleAuthor" className='form-label'>Article Author</label>
                        <input className='form-control' value={newAuthor} onChange={(event) => setAuthor(event.target.value)} type="text" id='articleAuthor' />
                    </div>
                    <div className="w-50 mt-3">
                        <select onChange={(event) => setState(event.target.value)} className="form-select" aria-label="Article State">
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                            <option value="Review">Review</option>
                        </select>
                    </div> */}
                    <button type='submit' className="btn btn-primary mt-3">Salva</button>
                </form>
            </section>

            {/* Articles */}
            <section className='mt-5'>
                <h3 className='pb-3'>My Articles</h3>
                {articlesList.length !== 0 ? articlesList.map((curArticle, index) =>
                    <div key={index} className="mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h6 className='card-title'>{curArticle.title}</h6>
                                {/* <span className={`btn btn-sm ${checkStateClass(curArticle.state)}`}>{curArticle.state}</span> */}
                                <button onClick={() => handleDelete(curArticle.id)} className='btn btn-outline-danger'>Delete</button>
                            </div>
                        </div>
                    </div>) : <p>Nessun Articolo Disponibile</p>}
            </section>
        </>
    )
}

export default AppArticles;

// const checkStateClass = (selectedValue) => {
//     let stateClass;
//     if (selectedValue === "Published") {
//         stateClass = "btn-success"
//     } else if (selectedValue === "Draft") {
//         stateClass = "btn-warning"
//     } else {
//         stateClass = "btn-primary"
//     }
//     return stateClass;
// }