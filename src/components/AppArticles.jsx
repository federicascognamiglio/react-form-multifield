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

    // Check Category Class Function
    const checkCategoryClass = (selectedValue) => {
        let stateClass;
        if (selectedValue === "Easy") {
            stateClass = "btn-success"
        } else if (selectedValue === "Medium") {
            stateClass = "btn-warning"
        } else {
            stateClass = "btn-danger"
        }
        return stateClass;
    }

    return (
        <>
            {/* Form */}
            <section className="pt-4">
                <h3>Add Article</h3>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className="row">
                        <div className='col-6'>
                            <label htmlFor="articleTitle" className='form-label'>Title</label>
                            <input name='title' className='form-control' value={formData.title} onChange={handleChange} type="text" id='articleTitle' />
                        </div>
                        <div className="col-6">
                            <label htmlFor="articleImage" className='form-label'>Image</label>
                            <input name='image' className='form-control' value={formData.image} onChange={handleChange} type="text" id='articleImage' />
                        </div>
                        <div className="col-6 mt-4">
                            <label htmlFor="articleContent" className='form-label'>Content</label>
                            <textarea name="content" className='form-control' value={formData.content} onChange={handleChange} id="articleContent"></textarea>
                        </div>
                        <div className="col-6 mt-4">
                            <label htmlFor='articleCategory' className='form-label'>Category</label>
                            <select name='category' onChange={handleChange} className="form-select" id='articleCategory' aria-label="ArticleCategory">
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button type='submit' className="btn btn-primary mt-3">Salva</button>
                        </div>
                    </div>
                </form>
            </section>

            {/* Articles */}
            <section className='mt-5'>
                <h3 className='pb-3'>My Articles</h3>
                <div className="row">
                    {articlesList.length !== 0 ? articlesList.map((curArticle, index) =>
                        <div key={index} className="col-4 mb-3">
                            <div className="card">
                                <img src={curArticle.image} alt="Placeholder image" />
                                <div className="card-body">
                                    <h6 className='card-title'><strong>{curArticle.title}</strong></h6>
                                    <div className='mb-3'>
                                        <span className={`d-inline-block btn btn-sm ${checkCategoryClass(curArticle.category)}`}>{curArticle.category}</span>
                                    </div>
                                    <p className='card-text'>{curArticle.content}</p>
                                    <button onClick={() => handleDelete(curArticle.id)} className='btn btn-outline-danger'>Delete</button>
                                </div>
                            </div>
                        </div>) : <p>Nessun Articolo Disponibile</p>}
                </div>
            </section>
        </>
    )
}

export default AppArticles;