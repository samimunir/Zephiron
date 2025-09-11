use anyhow::Result;
use clap::{Parser, Subcommand};
use std::path::PathBuf;

// job_tracker_cli: track your job applications locally.
#[derive(Parser, Debug)]
#[command(name = "job_tracker_cli", version, about = "Track your job applications locally")]
struct Cli {
    // Path to the JSON database file.
    #[arg(short, long, default_value = "joblog.json")]
    db: PathBuf,

    // Subcommand to run
    #[command(subcommand)]
    cmd: Command,
}

#[derive(Subcommand, Debug)]
enum Command {
    // Add a new application.
    Add {
        // Job title.
        title: String,
        // Company name,
        company: String,
    },

    // List all applications
    List,

    // Mark an application as a status (default: Closed). e.g. "done 3 Interview"
    Done {
        // Record ID
        id: usize,
        // New status (Closed | Interview | Open). Defaults to Closed.
        #[arg(default_value = "Closed")]
        status: String,
    },

    // Remove an application by ID
    Remove {
        // Record ID
        id: usize,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();

    match cli.cmd {
        Command::Add {title, company} => {
            println!("(placeholder) Would add '{title}' @ {company} into {:?}", cli.db);
        }
        Command::List => {
            println!("(placeholder) Would list items from {:?}", cli.db);
        }
        Command::Done {id, status} => {
            println!("(placeholder) Would mark #{id} as {status}");
        }
        Command::Remove {id} => {
            println!("(placeholder) Would remove #{id}");
        }
    }

    Ok(())
}