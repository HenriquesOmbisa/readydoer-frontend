#!/bin/bash

echo "🔧 Criando estrutura de rotas para sua plataforma..."

# Rotas públicas
mkdir -p app/{hire,project,auth/login,auth/signup,about,terms,pricing,not-found}
touch app/{hire,page.tsx,project/page.tsx,auth/login/page.tsx,auth/signup/page.tsx,about/page.tsx,terms/page.tsx,pricing/page.tsx,not-found/page.tsx}

# Rota dinâmica de projeto público
mkdir -p app/project/[id]
touch app/project/[id]/page.tsx

# Perfil público
mkdir -p app/freelancer/[username] app/client/[username]
touch app/freelancer/[username]/page.tsx app/client/[username]/page.tsx

# Dashboard comum
mkdir -p app/dashboard/{settings,messages}
touch app/dashboard/{settings/page.tsx,messages/page.tsx}

# Cliente
mkdir -p app/dashboard/client/{projects,new,contracts,reviews}
touch app/dashboard/client/projects/page.tsx
touch app/dashboard/client/projects/new/page.tsx
touch app/dashboard/client/projects/[id]/page.tsx
touch app/dashboard/client/contracts/page.tsx
touch app/dashboard/client/reviews/page.tsx

# Freelancer
mkdir -p app/dashboard/freelancer/{proposals,contracts,reviews,profile/edit}
touch app/dashboard/freelancer/proposals/page.tsx
touch app/dashboard/freelancer/contracts/page.tsx
touch app/dashboard/freelancer/reviews/page.tsx
touch app/dashboard/freelancer/profile/edit/page.tsx

# Admin
mkdir -p app/admin/{dashboard,projects,users,reports,reviews,finances}
touch app/admin/{dashboard/page.tsx,projects/page.tsx,users/page.tsx,reports/page.tsx,reviews/page.tsx,finances/page.tsx}

echo "✅ Estrutura pronta com rotas públicas, protegidas e admin!"
