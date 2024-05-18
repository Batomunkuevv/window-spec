export const MapObject = ({handleCloseClick}) => {
    return (
        <div className="map-object">
            <button type="button" onClick={() => handleCloseClick()} className="map-object__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M18 18L6 6" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>
            </button>
            <div className="map-object__location">
                <span className="map-object__location-icon">
                    <img src="../images/icons/location.svg" alt="Location" title="Location" />
                </span>
                <span className="map-object__location-text">г. Ярославль, ул. Первомайская, 2</span>
            </div>
            <h3 className="map-object__name">Остекление лоджии</h3>
            <div className="map-object__image">
                <img width={376} height={282} src="../images/blocks/cases/image.jpg" alt="Image" title="Image" />
            </div>
            <p className="map-object__description">Теплое остекление, дерево, какая-то доп инф.Теплое остекление, дерево, какая-то доп инф.</p>
            <ul className="map-object__info">
                <li className="map-object__info-item glass-background">
                    <span className="map-object__info-caption">Стоимость</span>
                    <span className="map-object__info-value">24 000₽</span>
                </li>
                <li className="map-object__info-item glass-background">
                    <span className="map-object__info-caption">Срок</span>
                    <span className="map-object__info-value">4 дня</span>
                </li>
            </ul>
        </div>
    )
}