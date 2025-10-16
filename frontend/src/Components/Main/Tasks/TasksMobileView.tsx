import { LeadingActions, SwipeableList, SwipeAction, SwipeableListItem, TrailingActions } from "react-swipeable-list"
import 'react-swipeable-list/dist/styles.css'


export default function TasksMobileView() {

    const leadingActions = () => {
        <LeadingActions>
            <SwipeAction onClick={}>
                <div className="my-leading-action">
                    Actualizar
                </div>
            </SwipeAction>
        </LeadingActions>
    }

    const trailingActions = () => {
        <TrailingActions>
            <SwipeAction onClick={}>
                <div>
                    Eliminar
                </div>
            </SwipeAction>
        </TrailingActions>
    }

  return (
    <SwipeableList>
        <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div>
                
            </div>

        </SwipeableListItem>
    </SwipeableList>
  )
}
