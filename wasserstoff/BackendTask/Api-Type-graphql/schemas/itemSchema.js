import { GraphQLObjectType,GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } from 'graphql';
import Item from '../model/Item.js'

//Item type
 const ItemType=new GraphQLObjectType({
    name:'Item',
    fields:()=>({
      id:{type:GraphQLID},
      name:{
        type:GraphQLNonNull(GraphQLString)
      },
      description:{
        type:GraphQLString
      },
      price:{
        type:GraphQLInt
      },
      available:{
        type:GraphQLBoolean
      },
    })
});

//Root Query
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        item:{
            type:ItemType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Item.findById(args.id);
            }
        },
        items:{
            type:new GraphQLList(ItemType),
            resolve(parent,args){
                return Item.find({});
            }
        }
    }
});

//Mutations
 const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addItem:{
            type:ItemType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                description:{type:GraphQLString},
                price:{type:GraphQLInt},
                available:{type:GraphQLBoolean}
            },
            resolve(parent,args){
                let item=new Item({
                    name:args.name,
                    description:args.description,
                    price:args.price,
                    available:args.available
                });
                return item.save();
            }
        },
        updateItem:{
            type:ItemType,
            args:{
                id:{
                    type:GraphQLNonNull(GraphQLID)
                },
                name:{type:GraphQLString},
                description:{type:GraphQLString},
                price:{type:GraphQLInt},
                available:{type:GraphQLBoolean}
            },
            resolve(parent,args){
                return Item.findByIdAndUpdate(args.id,{
                    $set:{
                        name:args.name,
                        description:args.description,
                        price:args.price,
                        available:args.available
                    }
                },{new:true});
            }
        },
        deleteItem:{
            type:ItemType,
            args:{
                id:{
                    type:GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent,args){
                return Item.findByIdAndDelete(args.id);
            }
        }
    }
});

export default new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});