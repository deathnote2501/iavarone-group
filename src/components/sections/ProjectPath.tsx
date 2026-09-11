import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Code2,
  Bot,
  ContactRound,
  Check,
} from "lucide-react";

const paths = [
  {
    icon: GraduationCap,
    color: "blue",
    title: "Faire monter l’équipe en compétences.",
    need: "Vos collaborateurs essaient l’IA mais manquent de méthode, de repères ou de cas d’usage adaptés.",
    brand: "Jérôme Iavarone",
    href: "/marques/jeromeiavarone",
    purpose: "Formation & conseil",
  },
  {
    icon: Code2,
    color: "blue",
    title: "Construire l’outil qui manque.",
    need: "Vos données et vos opérations sont dispersées ; vous avez besoin d’une application qui reflète votre activité.",
    brand: "IAvarone Conseil",
    href: "/marques/iavarone-conseil",
    purpose: "Applications métier",
  },
  {
    icon: Bot,
    color: "green",
    title: "Faire avancer une tâche récurrente.",
    need: "Le processus existe, mais la recherche, la préparation ou le suivi prend trop de temps chaque semaine.",
    brand: "Employé IA",
    href: "/marques/employe-ia",
    purpose: "Agents supervisés",
  },
  {
    icon: ContactRound,
    color: "red",
    title: "Mieux suivre les affaires commerciales.",
    need: "Vous voulez relier les contacts, les opportunités, les documents et les prochaines actions dans votre propre CRM.",
    brand: "CRM IA",
    href: "/marques/crm-ia",
    purpose: "CRM sur mesure",
  },
];

export function ProjectPath() {
  return (
    <section
      className="container-page group-orientation"
      id="choisir"
      aria-labelledby="orientation-title"
    >
      <p className="group-eyebrow">Votre besoin donne la direction</p>
      <h2 id="orientation-title">
        Le bon point de départ
        <br />
        pour votre projet.
      </h2>
      <p className="group-orientation-lead">
        Vous n’avez pas besoin d’avoir choisi une technologie. Partez de ce qui
        doit changer dans votre activité : les compétences, les outils ou les
        tâches du quotidien.
      </p>
      <ol className="group-paths">
        {paths.map(
          ({ icon: Icon, color, title, need, brand, href, purpose }, index) => (
            <li key={brand} className={`group-path group-color-${color}`}>
              <div className="group-path-top">
                <span className="group-directory-icon">
                  <Icon aria-hidden />
                </span>
                <span>0{index + 1}</span>
              </div>
              <p className="group-direction">{purpose}</p>
              <h3>{title}</h3>
              <p>{need}</p>
              <Link href={href}>
                Découvrir l’approche
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <span className="group-path-brand">{brand}</span>
            </li>
          ),
        )}
      </ol>
      <div className="group-path-foundation">
        <Check aria-hidden />
        <p>
          <strong>Un même interlocuteur pour cadrer la suite.</strong>{" "}Une
          formation peut faire émerger un outil métier ; un logiciel peut
          ensuite accueillir des tâches automatisées.
        </p>
      </div>
    </section>
  );
}
