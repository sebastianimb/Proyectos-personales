from fastapi import FastAPI, Query, Body, HTTPException

app = FastAPI(title="Mini blog")

BLOG_POST = [{"id": 1, "title": "First Post", "content": "This is the content of the first post."},
             {"id": 2, "title": "Second Post", "content": "This is the content of the second post."},
             {"id": 3, "title": "Third Post", "content": "This is the content of the third post."},
             {"id": 4, "title": "Fourth Post", "content": "This is the content of the fourth post."},
             {"id": 5, "title": "Fifth Post", "content": "This is the content of the fifth post."}]

@app.get("/")
def home():
    return {"message": "Welcome to the Mini Blog"}

@app.get("/posts")
def get_posts(query: str | None = Query(default=None, description="Search query for blog posts")):
    if query:
        result = [post for post in BLOG_POST if query.lower() in post["title"].lower()]
        """ for post in BLOG_POST:
            if query.lower() in post["title"].lower():
                result.append(post) """
        return {"data": result, "query": query}
    return {"data": BLOG_POST}

@app.get("/posts/{post_id}")
def get_post(
    post_id: int,
    include_content: bool | None = Query(default=True, description="Include content in the response")
    ):
    
    """ for post in BLOG_POST:
        if post["id"] == post_id:
            if not include_content:
                return {"data": {"id": post["id"], "title": post["title"]}}
            return {"data": post}
    """
    result = next((post for post in BLOG_POST if post["id"] == post_id), None)
    result_copy = result.copy() if result else None
    
    if not include_content:
        result_copy.pop("content", None)
        return {"data": result_copy}
    
    if result:
        return {"data": result}
    
    raise HTTPException(status_code=404, detail="Post not found")

@app.post("/posts")
def create_post(post: dict = Body(..., description="The blog post to create")):
    if "title" not in post or "content" not in post:
        return {"error": "Both 'title' and 'content' are required fields."}
    
    if not str(post["title"]).strip():
        return {"error": "The 'title' field must be a non-empty string."}
    
    new_id = (BLOG_POST[-1]["id"] + 1) if BLOG_POST else 1
    new_post = {"id": new_id, "title": post["title"], "content": post["content"]}
    BLOG_POST.append(new_post)
    return {"message": "Post created successfully", "data": new_post}

@app.put("/posts/{post_id}")
def update_post(post_id: int, post: dict = Body(..., description="The blog post to update")):
    for existing_post in BLOG_POST:
        if existing_post["id"] == post_id:
            if "title" in post: existing_post["title"] = post["title"]
            if "content" in post: existing_post["content"] = post["content"]
            return {"message": "Post updated successfully", "data": existing_post}
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/posts/{post_id}", status_code=204)
def delete_post(post_id: int):
    for index, existing_post in enumerate(BLOG_POST):
        if existing_post["id"] == post_id:
            BLOG_POST.pop(index)
            return
    raise HTTPException(status_code=404, detail="Post not found")