require "faker"
puts "Seeding data..."

lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id arcu purus. Maecenas ipsum odio, suscipit ultrices dolor eu, semper rhoncus nulla. Donec in turpis tempor, faucibus enim a, congue orci. In hac habitasse platea dictumst. Vivamus laoreet, urna a posuere sollicitudin, enim lectus pulvinar lacus, non gravida ante sem non felis. Morbi sed magna quam. In ut justo placerat, varius erat vestibulum, aliquet elit. Etiam at lectus vitae purus fermentum ultrices sed a quam. Curabitur venenatis fringilla semper. Suspendisse pharetra in libero ac accumsan.

Integer placerat mauris eros, vitae molestie augue feugiat ut. Ut dignissim at mi a porta. Proin mollis semper condimentum. Proin eleifend erat vel lorem placerat dictum. Donec interdum odio a feugiat maximus. Sed egestas lectus feugiat, laoreet tellus et, cursus mauris. Sed cursus tincidunt nulla in lacinia. Aliquam lobortis elit eu leo tristique vulputate. Donec venenatis sapien urna. Integer ut iaculis ex. Fusce ante lorem, maximus ut felis sed, tempor cursus leo. Vestibulum bibendum sapien vel euismod tincidunt. Aliquam imperdiet blandit nibh, et blandit elit aliquet non.

Integer quis consequat leo. Fusce enim tortor, varius nec ornare cursus, venenatis sit amet justo. Nunc maximus turpis eros, sed feugiat eros imperdiet vel. In hac habitasse platea dictumst. In sollicitudin lorem magna, nec vulputate velit condimentum ac. Morbi vehicula erat at consectetur finibus. In arcu nisl, volutpat a arcu non, finibus tincidunt turpis.

Etiam sagittis lorem eget justo porta, a mattis quam bibendum. Ut ac elit quis dui placerat elementum. Pellentesque varius finibus nulla id aliquet. Sed lorem lacus, condimentum vel tempus at, luctus eget ipsum. Nulla ac massa vel neque maximus pulvinar. Curabitur eros nulla, dignissim at auctor at, egestas id nulla. Nunc non lorem vitae sem ullamcorper sodales ac nec urna. Etiam tempor sollicitudin sapien sodales vestibulum. Ut non turpis arcu. Vestibulum est lorem, efficitur vel molestie et, bibendum at justo. Aliquam non turpis ornare, ultricies ligula nec, facilisis velit. Sed ut gravida odio, sed volutpat quam. Sed eu interdum enim. Mauris venenatis nunc mattis est sagittis placerat nec nec odio. In dignissim erat metus, vitae posuere ante congue eu. Proin faucibus aliquet tellus at condimentum.

Vivamus eu sagittis sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere turpis a eros dignissim, id interdum ex tristique. Donec posuere accumsan quam, non ullamcorper tellus cursus nec. Proin fermentum rutrum lorem, sit amet tempor ante sodales in. Sed id tempor eros, quis tristique risus. Integer risus ipsum, dapibus sed tellus eu, vestibulum iaculis dui. Morbi neque ipsum, aliquam sagittis eros et, congue dapibus quam. Etiam sagittis nibh nec ex tristique, eget blandit massa sodales. Donec vitae est ac leo hendrerit scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"

Article.destroy_all
User.destroy_all

User.create({email: "demo@demo.com", password: "password"})

25.times do 
    test_user = User.create({email: Faker::Internet.email, password: "password"})

    test_article = Article.new({
        title: Faker::Games::LeagueOfLegends.quote,
        body: lorem,
        user_id: test_user.id,
    })

    test_article.save!

    rand(8).times do 
        test_clap = Clap.new({article_id: test_article.id, user_id: test_user.id})
        test_clap.save!
    end
end



