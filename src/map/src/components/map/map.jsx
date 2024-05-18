import { useEffect, useState } from 'react';
import { YMaps, Map as YMap, ObjectManager } from '@pbe/react-yandex-maps';

import { MapObject } from '../map-object';

const placemarks = {
    "type": "FeatureCollection",
    "features": [
        {
            type: 'Feature',
            id: 1,
            geometry: {
                type: 'Point',
                coordinates: [57.642074, 39.897627]
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: '../images/blocks/map/placemark.svg',
                iconImageSize: window.innerWidth > 576 ? [40, 40] : [32, 32],
                iconImageOffset: [-5, -38]
            }
        },
        {
            type: 'Feature',
            id: 2,
            geometry: {
                type: 'Point',
                coordinates: [57.649280, 39.918571]
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: '../images/blocks/map/placemark.svg',
                iconImageSize: window.innerWidth > 576 ? [40, 40] : [32, 32],
                iconImageOffset: [-5, -38]
            }
        }
    ]

}

export const Map = () => {
    const [mapRef, setMapRef] = useState(null);
    const [managerRef, setManagerRef] = useState(null);
    const [mapObject, setMapObject] = useState(null);
    const mapOptions = {
        className: 'map-section__map',
        defaultState: {
            center: [57.642074, 39.897627],
            zoom: window.innerWidth > 576 ? 13 : 11
        },
        instanceRef: mapRef => setMapRef(mapRef)
    }

    const observeClickPlacemarks = () => {
        if (!managerRef) return;

        const { objects } = managerRef;

        objects.events.add('click', (e) => handlePlacemarkClick(e))
    }

    const observeClickOnMap = () => {
        if (!mapRef) return;

        const { events } = mapRef;

        events.add('click', (e) => {
            const objectManager = mapRef.geoObjects.get(0);

            resetActivePlacemarks(objectManager);
        })
    }

    const handlePlacemarkClick = (e) => {
        const { objects } = managerRef;
        const placemarkId = e.get('objectId');

        resetActivePlacemarks();

        objects.setObjectOptions(placemarkId,
            { iconImageHref: '../images/blocks/map/placemark-active.svg' });
        setMapObject(true);
    }

    const resetActivePlacemarks = (manager = managerRef) => {
        setMapObject(false);

        manager.objects.each(placemark => {
            const { id } = placemark;

            manager.objects.setObjectOptions(id,
                { iconImageHref: '../images/blocks/map/placemark.svg' });
        })
    }

    useEffect(() => {
        observeClickPlacemarks();
    }, [managerRef])

    useEffect(() => {
        observeClickOnMap();
    }, [mapRef])

    return (
        <>
            <YMaps>
                <YMap {...mapOptions} >
                    <ObjectManager
                        instanceRef={manager => setManagerRef(manager)}
                        options={{
                            clusterize: false
                        }}
                        clusters={{
                            preset: "islands#redClusterIcons",
                        }}
                        defaultFeatures={placemarks}
                    />
                </YMap>
            </YMaps>
            {mapObject && <MapObject handleCloseClick={resetActivePlacemarks} />}
        </>
    )
}