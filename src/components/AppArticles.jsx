import { useState } from 'react'
import articles from '../data/articles';

// Valori di partenza Form
const initialFormData = {
    title: "",
    image: "",
    content: "",
    category: "",
    state: false,
    tags: []
};

const availableTags = ["Beginner", "Advanced", "JS", "CSS", "HTML", "Programming", "FrontEnd", "BackEnd"];

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

    const [selectedChecks, setSelectedChecks] = useState([]);
    const handleMultipleCheckbox = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        // Calcolo il nuovo array di selectedChecks
        const updatedChecks = isChecked ? [...selectedChecks, value] : selectedChecks.filter((curValue) => curValue !== value);

        // Aggiorna lo stato di selectedChecks
        setSelectedChecks(updatedChecks);

        // Aggiorna formData
        setFormData({
            ...formData,
            tags: updatedChecks,
        });
    }

    // Delete Function
    const handleDelete = (idToDelete) => {
        const filteredList = articlesList.filter(curArticle => curArticle.id !== idToDelete)
        setArticlesList(filteredList);
    }

    // Category Class Function
    const categoryClass = (selectedValue) => {
        let categoryClass;
        if (selectedValue === "Easy") {
            categoryClass = "btn-success"
        } else if (selectedValue === "Medium") {
            categoryClass = "btn-warning"
        } else {
            categoryClass = "btn-danger"
        }
        return categoryClass;
    }

    // State Class Function
    const stateClass = (stateValue) => stateValue ? "btn-primary" : "btn-outline-primary";
    // State Text Function
    const stateText = (stateValue) => stateValue ? "Public" : "Private";

    return (
        <>
            {/* Form */}
            <section className="pt-4">
                <h3>Add Article</h3>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className="row">
                        {/* Title Input */}
                        <div className='col-6'>
                            <label htmlFor="articleTitle" className='form-label'>Title</label>
                            <input name='title' className='form-control' value={formData.title} onChange={handleChange} type="text" id='articleTitle' />
                        </div>
                        {/* Image Input */}
                        <div className="col-6">
                            <label htmlFor="articleImage" className='form-label'>Image</label>
                            <input name='image' className='form-control' value={formData.image} onChange={handleChange} type="text" id='articleImage' />
                        </div>
                        {/* Content Input */}
                        <div className="col-6 mt-4">
                            <label htmlFor="articleContent" className='form-label'>Content</label>
                            <textarea name="content" className='form-control' value={formData.content} onChange={handleChange} id="articleContent" rows="5"></textarea>
                        </div>
                        <div className="col-6 mt-4">
                            {/* Category Select */}
                            <label htmlFor='articleCategory' className='form-label'>Category</label>
                            <select name='category' onChange={handleChange} className="form-select" id='articleCategory' aria-label="ArticleCategory">
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                            {/* State CheckBox */}
                            <div className='mt-4'>
                                <p className='fw-medium'>Check to make your article public:</p>
                                <input name='state' checked={formData.state} onChange={handleChange} className='form-check-input me-2' type="checkbox" id='articleStatePublic' />
                                <label htmlFor="articleStatePublic" className='form-check-label'>Make Public</label>
                            </div>
                        </div>
                        {/* Tags CheckBox */}
                        <div className="col-12 mt-4">
                            <p className='fw-medium'>Tags:</p>
                            <div className='d-flex justify-content-between'>
                                {availableTags.map((curTag, index) => <div key={index} className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes(curTag)} onChange={handleMultipleCheckbox} className='form-check-input me-2' id={'ckeck' + curTag} value={curTag} />
                                    <label htmlFor={'ckeck' + curTag} className='form-check-label'>{curTag}</label>
                                </div>)}
                            </div>
                        </div>
                    </div>
                    {/* Form Button */}
                    <div className="col-12">
                        <button type='submit' className="btn btn-primary mt-3">Save</button>
                    </div>
                </form>
            </section >

            {/* Articles */}
            <section className='mt-5' >
                <h3 className='pb-3'>My Articles</h3>
                <div className="row">
                    {articlesList.length !== 0 ? articlesList.map((curArticle, index) =>
                        <div key={index} className="col-4 mb-3">
                            <div className="card">
                                <img src={curArticle.image} alt="Placeholder image" />
                                <div className="card-body">
                                    <h6 className='card-title'><strong>{curArticle.title}</strong></h6>
                                    <div className='mb-3'>
                                        <span className={`btn btn-sm ${categoryClass(curArticle.category)} me-3`}>{curArticle.category}</span>
                                        <span className={`btn btn-sm ${stateClass(curArticle.state)}`}>{stateText(curArticle.state)}</span>
                                    </div>
                                    <p className='card-text'>{curArticle.content}</p>
                                    <div>
                                        {curArticle.tags.map((curTag, index) => <span key={index} className='badge text-bg-dark me-2 mb-4'>{curTag}</span>)}
                                    </div>
                                    <button onClick={() => handleDelete(curArticle.id)} className='btn btn-outline-danger'>Delete</button>
                                </div>
                            </div>
                        </div>) : <p>Nessun Articolo Disponibile</p>}
                </div>
            </section >
        </>
    )
}

export default AppArticles;