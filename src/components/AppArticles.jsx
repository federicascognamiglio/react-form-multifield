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
        event.target.checked ? setSelectedChecks([...selectedChecks, event.target.value]) : setSelectedChecks(selectedChecks.filter(curValue => !curValue === event.target.value))
        const newData = {
            ...formData,
            tags: selectedChecks
        }
        setFormData(newData)
        console.log(selectedChecks);
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
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes("Beginner")} onChange={handleMultipleCheckbox} className='form-check-input me-2' id='ckeckBeginner' value="Beginner"/>
                                    <label htmlFor="checkBeginner" className='form-check-label'>Beginner</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes("Advanced")} onChange={handleMultipleCheckbox} className='form-check-input me-2' id='ckeckAdvanced'  value="Advanced"/>
                                    <label htmlFor="ckeckAdvanced" className='form-check-label'>Advanced</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes("JS")} onChange={handleMultipleCheckbox} className='form-check-input me-2' id='ckeckJs'  value="JS"/>
                                    <label htmlFor="ckeckJs" className='form-check-label'>JS</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes("CSS")} onChange={handleMultipleCheckbox} className='form-check-input me-2' id='ckeckCss'  value="CSS"/>
                                    <label htmlFor="ckeckCss" className='form-check-label'>CSS</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes("HTML")} onChange={handleMultipleCheckbox} className='form-check-input me-2' id='ckeckHtml'  value="HTML"/>
                                    <label htmlFor="ckeckHtml" className='form-check-label'>HTML</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes("Programming")} onChange={handleMultipleCheckbox} className='form-check-input me-2' id='ckeckProgramming'  value="Programming"/>
                                    <label htmlFor="'ckeckProgramming" className='form-check-label'>Programming</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes("FrontEnd")} onChange={handleMultipleCheckbox} className='form-check-input me-2' id='ckeckFront' value="FrontEnd"/>
                                    <label htmlFor="'ckeckFront" className='form-check-label'>FrontEnd</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" checked={selectedChecks.includes("BackEnd")} onChange={handleMultipleCheckbox} className='form-check-input me-2' id='ckeckBack' value="BackEnd"/>
                                    <label htmlFor="'ckeckBack" className='form-check-label'>BackEnd</label>
                                </div>
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