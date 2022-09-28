const getMobilesDataByKeyword = async(keyword) => {
    const dataURL = `https://openapi.programming-hero.com/api/phones?search=${keyword}`;
    const response = await fetch(dataURL);
    const data = await response.json();

    displayMobilesData(data.data);
}

const displayMobilesData = mobiles => {

    if (mobiles.length === 0) {
        noProductsFoundMessage(true);
        showPreloader(false);
    } else {
        noProductsFoundMessage(false);
    }

    if (mobiles.length > 12) {
        const showMoreProductsAvailableTime = Math.ceil(mobiles.length / 12);

        let showedMobilesCountTime = 0;
        let totalShoedMobiles = 0;
        const showMoreFromRestMobiles = () => {
            if (showMoreProductsAvailableTime >= showedMobilesCountTime ) {
                showMobilesDataInWebsite(mobiles.slice(totalShoedMobiles, totalShoedMobiles + 12));
                totalShoedMobiles += 12;
            } else {
                showMoreProductsSection(false);
            }
        }

        showMoreFromRestMobiles();
        showedMobilesCountTime++;

        showMoreProductsSection(true);

        document.getElementById("showMoreProductsBtn").addEventListener('click', () => {
            showMoreFromRestMobiles();
            showedMobilesCountTime++;
        });  
    } else {
        showMoreProductsSection(false);
    } 
}


const showMobilesDataInWebsite = mobiles => {
    const mobilesCardsSection = document.getElementById("mobilesCardsSection");
    mobiles.forEach(mobile => {
        const mobileName = mobile.phone_name;
        const mobileBrand = mobile.brand;
        const mobileImageURL = mobile.image;
        const mobileSlug = mobile.slug;

        const newMobileCardDiv = document.createElement('div');
        newMobileCardDiv.classList.add('col');
        newMobileCardDiv.innerHTML = `<div class="card h-100 rounded-4 shadow-sm">
            <img src="${mobileImageURL}" class="card-img-top px-5 pt-4 w-75 mx-auto" alt="${mobileName} Image">
                <div class="card-body text-center">
                    <h4 class="card-title">${mobileName}</h4>
                    <p class="text-muted"><strong>Brand</strong>: ${mobileBrand}</p>
                    <p class="text-muted">Lorem ipsum dolor, sit amet helle  e consectetur adipisicing omnis!</p>
                    <button type="button" class="btn btn-secondary w-100 py-2 rounded-3" data-bs-toggle="modal" data-bs-target="#productQuickViewModal" onclick="getQuickViewDataBySlug('${mobileSlug}')">Quick View</button>
                </div>
            </div>`;

        mobilesCardsSection.appendChild(newMobileCardDiv);

        // After completed loading all products hide preloader...
        showPreloader(false);
    });
}

const getQuickViewDataBySlug = async(slug) => {
    const dataURL = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const response = await fetch(dataURL);
    const data = await response.json();

    displayQuickViewData(data.data);
}

const displayQuickViewData = mobileData => {
    const mobileName = mobileData.name;
    const mobileBrand = mobileData.brand;
    const mobileImageURL = mobileData.image;
    const mobileReleaseDate = mobileData.releaseDate;
    const mobileProcessor = mobileData.mainFeatures.chipSet;
    const mobileMemory = mobileData.mainFeatures.memory;
    const mobileStorage = mobileData.mainFeatures.storage;
    const mobileDisplaySize = mobileData.mainFeatures.displaySize;
    const mobileSensors = mobileData.mainFeatures.sensors;

    document.getElementById("mobileQuickViewImage").src = mobileImageURL;
    document.getElementById("mobileQuickViewName").innerText = mobileName;
    document.getElementById("mobileQuickViewBrandName").innerText = mobileBrand;
    document.getElementById("mobileQuickViewReleaseDate").innerText = mobileReleaseDate;
    document.getElementById("mobileQuickViewProcessor").innerText = mobileProcessor;
    document.getElementById("mobileQuickViewMemory").innerText = mobileMemory;
    document.getElementById("mobileQuickViewStorage").innerText = mobileStorage;
    document.getElementById("mobileQuickViewDisplaySize").innerText = mobileDisplaySize;
    document.getElementById("mobileQuickViewSensors").innerText = mobileSensors;
}

const showPreloader = isLoading => {
    const preloaderSection = document.getElementById("preloaderSection");
    if (isLoading) {
        preloaderSection.style.display = 'block';;
    }else {
        preloaderSection.style.display = 'none';
    }
}

const noProductsFoundMessage = isProductsNotFound => {
    const noProductsFoundMessageSection =  document.getElementById("noProductsFoundMessage");
    if (isProductsNotFound) {
        noProductsFoundMessageSection.style.display = 'block';
    } else {
        noProductsFoundMessageSection.style.display = 'none';
    }
}

const showMoreProductsSection = show => {
    const showMoreProductsSection = document.getElementById("showMoreProductsSection");
    if (show) {
        showMoreProductsSection.style.display = 'block';
    } else {
        showMoreProductsSection.style.display = 'none';
    }
}


document.getElementById("searchBtn").addEventListener('click', () => {
    const searchBar = document.getElementById("searchBar");
    if(searchBar.value) {
        // Show preloader while loading products...
        showPreloader(true);
        document.getElementById("mobilesCardsSection").innerHTML = '';
        getMobilesDataByKeyword(searchBar.value);
    }
    searchBar.value = '';
});

showPreloader(true);
getMobilesDataByKeyword('a');