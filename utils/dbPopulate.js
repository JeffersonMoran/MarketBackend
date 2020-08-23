module.exports = app => {
    const { User, Market, Product } = app.models;

    const generateData = async () => {

        const { user, products, markets } = getData();

        const newUser = createUser(user);
        const newMarkets = createMarkets(markets);
        const db_markets = await Market.find();
        await Promise.all([newUser, newMarkets]);
        await createProducts(db_markets, products);

        return true;
    }

    createUser = async (user) => {
        try {
            return await User.create(user);
        } catch (e) {
            console.log(e)
        }
    }

    createMarkets = async (markets) => {
        try {
            return await Market.create(markets);
        } catch (e) {
            console.log(e)
        }
    }

    createProducts = async (db_markets, products) => {
        try {
            const mapped_products = db_markets.map((market, index) => {
                const values = index % 2 === 0 ? [2, 4, 6] : [1, 3, 5];
                const product = products.filter(product => values.includes(product.id));
                return {
                    market: market._id,
                    ...product
                }
            })
            return await Product.create(mapped_products);
        } catch (e) {
            console.log(e)
        }
    }

    getData = () => {
        const user = [
            { name: "admin", email: 'admin@marketdb.com', password: "Teste123?" },
            { name: "user", email: 'user@marketdb.com', password: "User123?" },
        ]

        const markets = [
            { nome: 'Supermercado Extra', imagem: 'https://logodownload.org/wp-content/uploads/2014/12/extra-logo-mercado.jpg' },
            { nome: 'Supermercado Carrefour', imagem: 'https://www.carrefour.com.br/_ui/responsive/theme-carrefour/images/logo_carrefourgif.gif' },
            { nome: 'Supermercado União', imagem: 'https://lh3.googleusercontent.com/proxy/OAIppg3Up-E_es2pYXvyBScKAEqPqzmgyv4zgS48CGWPpCmvAZsbv9nC52qaFTOrf0XGE28GRmWnQ8BV5cXcJ0RwKTlaR6oSeUkylRJUzvf74YbTbyVXQq7yrtfPdrBUUalCHU0' },
            { nome: 'Supermercado Dia', imagem: 'https://na001.leafletcdns.com/com.br/data/12/logo.png' },
            { nome: 'Supermercado Mendonça', imagem: 'https://scontent.fbjp2-1.fna.fbcdn.net/v/t1.0-9/37251602_1776359329109286_4020720856622694400_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=-RAhyvvzajgAX8tMV5K&_nc_ht=scontent.fbjp2-1.fna&oh=5d3dec2f2b5320a07fa5dc011265f590&oe=5F5FFCE8' },
            { nome: 'Supermercado Mercadão', imagem: 'https://www.mercadaoatacadista.com.br/wp-content/uploads/2018/05/logomercadao-1.png' },
            { nome: 'Supermercado Big', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXq9YJaT0gsUwltNdAe_DatL6S87MOoewyTg&usqp=CAU' }
        ];

        const products = [
            { id: 1, nome: 'Nescau', descricao: 'Achocolatado em Pó Chocolate Nescau 2.0', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg', preco: 6.7 },
            { id: 2, nome: 'Salgadinho Cheetos', descricao: 'Salgadinho Cheetos Onda Sabor Requeijão Elma Chips 150g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h42/h7b/h00/h00/12209451237406.jpg', preco: 7 },
            { id: 3, nome: 'Requeijão Cremoso Danone', descricao: 'Requeijão Cremoso Danone 200g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h07/he4/h00/h00/9229002473502.jpg', preco: 5 },
            { id: 4, nome: 'Salgadinho Cheetos', descricao: 'Salgadinho Cheetos Onda Sabor Requeijão Elma Chips 50g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h42/h7b/h00/h00/12209451237406.jpg', preco: 3 },
            { id: 5, nome: 'Banana Prata', descricao: 'Banana Prata', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h3c/h4c/h00/h00/14506624385054.jpg', preco: 3 },
            { id: 6, nome: 'Uva', descricao: 'Uva 500g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/he4/h19/h00/h00/10621361455134.jpg', preco: 7 },
        ];

        return { user, markets, products }
    }

    return { generateData }
}