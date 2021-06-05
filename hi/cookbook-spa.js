//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent} from "uu5g04-hooks";

import Recipe from "recipe";
import Ingredient from "ingredient";
import RecipeList from "recipeList";
import IngredientList from "ingredientList";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "CookBookSpa",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;

    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}

    .uu5-bricks-header {
      margin-top: 8px;
    }

    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const CookBookSpa = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        function goToRecipeList() {
            UU5.Environment.getRouter().setRoute("recipeList")
        }

        function goToIngredientList() {
            UU5.Environment.getRouter().setRoute("ingredientList")
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        return (
            <UU5.Bricks.Page
                {...attrs}
                type="1"
                leftWrapperProps={{style: {backgroundColor: '#ffe4ec'}}}
                top={
                    <UU5.Bricks.Box colorSchema="pink" className="center">
                        <UU5.Bricks.Lsi lsi={{en: "uuCookBook - Team 6", cs: "uuCookBook - Tým 6"}}/>
                    </UU5.Bricks.Box>
                }
                left={
                    <UU5.Bricks.Div>
                        <UU5.Bricks.Image src="https://i.imgur.com/MVkHqpM.jpg" type="rounded" />
                        <UU5.Bricks.Box colorSchema='pink' content='CookBook svatého jednorožce' ></UU5.Bricks.Box>
                        <UU5.Bricks.LanguageSelector displayedLanguages={["cs", "en"]}/>
                        <div className="uu5-common-padding-s">
                            <div>
                                <UU5.Bricks.Button
                                    bgStyle={"transparent"}
                                    onClick={goToRecipeList}
                                >
                                    <UU5.Bricks.Icon icon="mdi-playlist-check"/>
                                    <UU5.Bricks.Lsi lsi={{en: "Recipes", cs: "Recepty"}}/>
                                </UU5.Bricks.Button>

                            </div>
                            <div>
                                <UU5.Bricks.Button
                                    bgStyle={"transparent"}
                                    onClick={goToIngredientList}
                                >
                                    <UU5.Bricks.Icon icon="mdi-food-apple"/>
                                    <UU5.Bricks.Lsi lsi={{en: "Ingredients", cs: "Ingredience"}}/>
                                </UU5.Bricks.Button>
                            </div>
                        </div>
                    </UU5.Bricks.Div>
                }
                leftWidth="xs-25 s-20 m-15 l-15 xl-15"
                leftFixed={true}
                topFixed={"smart"}
                leftSwipe={true}
            >
                <UU5.Common.Router
                    basePath={""}
                    routes={{
                        "": {component: <div>home</div>},
                        "recipeList": {component: <RecipeList/>},
                        "ingredientList": {component: <IngredientList/>},
                        "recipe": {component: <Recipe/>},
                        "ingredient": {component: <Ingredient/>},
                    }}/>
            </UU5.Bricks.Page>
        );
        //@@viewOff:render
    },
})
;

export default CookBookSpa;