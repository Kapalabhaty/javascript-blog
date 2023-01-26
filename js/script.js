'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  
  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
    
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
    
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
        
  clickedElement.classList.add('active');

  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /*[DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');

}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'cloud-size-';
const optAuthorsListSelector ='.list.authors';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
    
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleId + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    // titleList.insertAdjacentHTML('beforeend', linkHTML);
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
        
    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('examine', links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateCloudParams(tags){
  const params = {min:99999 , max:0};

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }

    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateCloudClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  return optCloudClassPrefix + Math.floor( percentage * (optCloudClassCount - 1) + 1 );
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};   

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){
  
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
        
    /* make html variable with empty string */
    let html = '';
  
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTag works', articleTags);
  
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray works', articleTagsArray);
  
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log ('Separated tag -', tag);
  
      /* generate HTML of the link */
      const linkHTML = '<li><a class="tag" href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log(linkHTML);
  
      /* add generated code to html variable */
      html = html + linkHTML;
			
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {

        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */
       
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
  
    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const rightTagList = document.querySelector(optTagsListSelector);

    const cloudParams = calculateCloudParams(allTags);
    console.log('TAGS PARAMS:', cloudParams);

    /* [NEW] create variable from all links to HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags : */
    for(let tag in allTags){
		
      const cloudClassName = calculateCloudClass(allTags[tag] , cloudParams);

      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '" class="tag ' + cloudClassName + '">'+ tag +'</a></li>' ;

      /* [NEW] START LOOP: for each tag in allTags : */
    }
    /* [NEW] add html from allTagsHTML to rightTagList */
    rightTagList.innerHTML = allTagsHTML;
  }
} 
generateTags();

function tagClickHandler(event){
   
  /* prevent default action for this event */
  event.preventDefault();
  console.log('tagClickHandler fired');
    
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.split('-')[1];
  // OR const tag = href.replace('#tag-', '');
    
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.tag.active');
  
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    console.log (activeTag);
  
    /* remove class active */
    activeTag.classList.remove('active');
  
    /* END LOOP: for each active tag link */
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsWithMatchedHref = document.querySelectorAll('[href="'+ href +'"]');
  
  /* START LOOP: for each found tag link */
  for(let tagWithMatchedHref of tagsWithMatchedHref){
        
    /* add class active */
    tagWithMatchedHref.classList.add('active');
        
    /* END LOOP: for each found tag link */
  }
  
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
  
function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('.tag');
  
  /* START LOOP: for each link */
  for(let tag of tags){

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
        
    /* END LOOP: for each link */
  }
}
  
addClickListenersToTags();

function generateAuthors(){ 
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
	
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){
  
    /* find author wrapper */
    const postAuthorWrapper = article.querySelector(optArticleAuthorSelector);
        
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor works', articleAuthor);
  
    /* generate HTML of the link */
    const linkHTML = '<a class="author-name" href="#' + articleAuthor + '">' + articleAuthor + '</a>';
    console.log(linkHTML);
  
    /* add generated code to html variable */
    postAuthorWrapper.insertAdjacentHTML('beforeend', linkHTML);

    /* [NEW] check if this author is NOT already in allAuthors */
    if(!allAuthors[articleAuthor]) {
      /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }       
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const rightAuthorsList = document.querySelector(optAuthorsListSelector);
  const cloudParams = calculateCloudParams(allAuthors);

  /* [NEW] create variable from all links to HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors : */
  for(let author in allAuthors){	
    const cloudClassName = calculateCloudClass(allAuthors[author] , cloudParams);
    /* [NEW] generate code of a link and add it to allAuthorsHTML */		
    allAuthorsHTML += '<li><a class="author-name" href="#'+ author +'"><span class="'+ cloudClassName +'">'+ author +' (' + allAuthors[author]  + ')</span></a></li>' ;
    /* [NEW] START LOOP: for each author in allAuthors : */
  }
  /* [NEW] add html from allAuthors to rightAuthorsList */
  rightAuthorsList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event){
/* prevent default action for this event */
  event.preventDefault();
  console.log('authorClickHandler fired');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "authorName" and extract tag from the "href" constant */
  const authorName = href.replace('#', '');
   
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + authorName + '"]');

}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authors = document.querySelectorAll('a.author-name');
  
  /* START LOOP: for each link */
  for(let author of authors){

    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
        
    /* END LOOP: for each link */
  }    
}

addClickListenersToAuthors();


